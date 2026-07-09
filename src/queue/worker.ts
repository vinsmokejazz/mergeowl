import * as dotenv from "dotenv";
dotenv.config();

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { execSync } from "node:child_process";
import { Worker } from "bullmq";
import { githubApp } from "../github/app";
import { fetchDiff } from "../github/diff";
import { getAIReview } from "../ai/review";
import { postReview } from "../github/comments";
import { findRelevantChunks } from "../db/search";
import { db } from "../db/client";
import { reviews, codeEmbeddings } from "../db/schema";
import { connection } from "./redis";
import type { ReviewJobData, IndexJobData } from "./producer";
import { indexRepository } from "../db/indexer";
import { eq, sql } from "drizzle-orm";

export function startWorker() {
  const worker = new Worker<any>(
    "pr-review",
    async (job) => {
      if (job.name === "index-repo") {
        const { repoFullName, installationId } = job.data as IndexJobData;
        console.log(`\n[Worker] Dynamic indexing requested for ${repoFullName}`);
        const octokit = await githubApp.getInstallationOctokit(installationId);
        const auth = await octokit.auth({ type: "installation" }) as any;
        const token = auth.token;
        const repoUrl = `https://x-access-token:${token}@github.com/${repoFullName}.git`;
        
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mergeowl-"));
        console.log(`[Worker] Cloning ${repoFullName} to ${tmpDir}...`);
        
        execSync(`git clone --depth 1 ${repoUrl} ${tmpDir}`, { stdio: "ignore" });
        
        await indexRepository(repoFullName, tmpDir);
        
        fs.rmSync(tmpDir, { recursive: true, force: true });
        console.log(`[Worker] Dynamic indexing complete for ${repoFullName}`);
        return;
      }

      const { owner, repo, repoFullName, pull_number, installation_id } =
        job.data as ReviewJobData;

      console.log(
        `\n[Worker] Processing PR #${pull_number} in ${repoFullName}`,
      );

      const octokit = await githubApp.getInstallationOctokit(installation_id);

      const { data: pr } = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls/{pull_number}",
        { owner, repo, pull_number },
      );

      const { files, diffText } = await fetchDiff(
        octokit,
        owner,
        repo,
        pull_number,
      );

      // Check if we need to dynamically index the repo first
      const existingEmbeddingsCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(codeEmbeddings)
        .where(eq(codeEmbeddings.repoFullName, repoFullName));

      const count = Number(existingEmbeddingsCount[0]?.count ?? 0);

      if (count === 0) {
        console.log(`[Worker] Repo ${repoFullName} has 0 embeddings. Indexing dynamically...`);
        try {
          const auth = await octokit.auth({ type: "installation" }) as any;
          const token = auth.token;
          const repoUrl = `https://x-access-token:${token}@github.com/${repoFullName}.git`;
          
          const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mergeowl-"));
          console.log(`[Worker] Cloning ${repoFullName} to ${tmpDir}...`);
          
          execSync(`git clone --depth 1 ${repoUrl} ${tmpDir}`, { stdio: "ignore" });
          
          await indexRepository(repoFullName, tmpDir);
          
          fs.rmSync(tmpDir, { recursive: true, force: true });
          console.log(`[Worker] Dynamic indexing complete for ${repoFullName}`);
        } catch (idxErr: any) {
          console.error(`[Worker] Failed to dynamically index ${repoFullName}:`, idxErr.message);
        }
      }

      const contextChunks = await findRelevantChunks(repoFullName, diffText);
      const review = await getAIReview(diffText, contextChunks);

      await postReview(
        octokit,
        owner,
        repo,
        pull_number,
        review.summary,
        review.reviews,
        files,
      );

      await db.insert(reviews).values({
        repoFullName,
        pullNumber: pull_number,
        pullTitle: pr.title,
        commentsCount: review.reviews.length,
        summary: review.summary,
        status: "completed",
        createdAt: new Date().toISOString(),
      });

      console.log(`[Worker] ✅ Review posted and saved for PR #${pull_number}`);
    },
    { connection: connection as any },
  );

  worker.on("completed", (job) =>
    console.log(`[Worker] Job ${job.id} completed`),
  );
  worker.on("failed", (job, err) =>
    console.error(`[Worker] Job ${job?.id} failed:`, err.message),
  );

  console.log("Worker started inside API process");
  return worker;
}
