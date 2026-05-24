import { db } from "./client";
import { generateEmbedding } from "../ai/embeddings";
import { sql } from "drizzle-orm";

export async function findRelevantChunks(
  repoFullName: string,
  diffText: string,
  topK = 10,
): Promise<string[]> {
  // Embed the diff to get a query vector
  const queryEmbedding = await generateEmbedding(diffText.slice(0, 2000));
  const vectorString = `[${queryEmbedding.join(",")}]`;

  // Cosine similarity search using pgvector <=> operator
  const results = await db.execute(sql`
    SELECT chunk_text, file_path,
           1 - (embedding <=> ${vectorString}::vector) AS similarity
    FROM code_embeddings
    WHERE repo_full_name = ${repoFullName}
    ORDER BY embedding <=> ${vectorString}::vector
    LIMIT ${topK}
  `);

  return (results.rows as any[]).map(
    (row) => `// ${row.file_path}\n${row.chunk_text}`,
  );
}
