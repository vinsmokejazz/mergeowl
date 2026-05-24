import { db } from "./client";
import { codeEmbeddings } from "./schema";
import { generateEmbedding } from "../ai/embeddings";
import { eq } from "drizzle-orm";
import fs from "node:fs";
import path from "node:path";

// File extensions worth indexing — skip images, locks, etc.
const INDEXABLE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".py",
  ".go",
  ".java",
  ".rs",
  ".cpp",
  ".c",
  ".cs",
  ".rb",
  ".php",
  ".swift",
  ".kt",
  ".md",
]);

// Folders to always skip
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
  ".env",
  "generated",
  "runtime",
]);

// Chunk code into ~500 token pieces by splitting on double newlines
// This keeps functions/classes together better than fixed character splits
function chunkCode(content: string, chunkSize = 1500): string[] {
  const chunks: string[] = [];
  const blocks = content.split(/\n\n+/); // split on blank lines

  let current = "";

  for (const block of blocks) {
    if ((current + block).length > chunkSize && current.length > 0) {
      chunks.push(current.trim());
      current = block;
    } else {
      current += (current ? "\n\n" : "") + block;
    }
  }

  if (current.trim()) chunks.push(current.trim());

  return chunks;
}

// Recursively collect all indexable files from a directory
function collectFiles(dir: string, baseDir: string): string[] {
  const results: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, baseDir));
    } else if (INDEXABLE_EXTENSIONS.has(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }

  return results;
}

export async function indexRepository(
  repoFullName: string,
  repoPath: string,
): Promise<void> {
  console.log(`Indexing ${repoFullName}...`);

  // Delete old embeddings for this repo first (re-indexing)
  await db
    .delete(codeEmbeddings)
    .where(eq(codeEmbeddings.repoFullName, repoFullName));

  const files = collectFiles(repoPath, repoPath);
  console.log(`Found ${files.length} files to index`);

  let totalChunks = 0;

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf-8");
    if (!content.trim()) continue;

    const relativePath = path.relative(repoPath, filePath).replace(/\\/g, "/");
    const chunks = chunkCode(content);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      try {
        const embedding = await generateEmbedding(
          `File: ${relativePath}\n\n${chunk}`,
        );

        // Rate limit protection — wait 500ms between requests
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Estimate line numbers from chunk position
        const linesBeforeChunk = content
          .slice(0, content.indexOf(chunk))
          .split("\n").length;

        console.log(`  Storing chunk ${i} for ${relativePath}...`);
        await db.insert(codeEmbeddings).values({
          repoFullName,
          filePath: relativePath,
          chunkText: chunk,
          startLine: linesBeforeChunk,
          endLine: linesBeforeChunk + chunk.split("\n").length,
          embedding: embedding as any,
        });

        totalChunks++;
      } catch (err: any) {
        // Log the full error, not just the message
        console.error(
          `Failed to embed ${relativePath} chunk ${i}:`,
          err.cause?.message || err.message,
          err.cause,
        );
      }
    }

    console.log(`  ✓ ${relativePath} (${chunks.length} chunks)`);
  }

  console.log(`\nIndexing complete: ${totalChunks} chunks stored`);
}
