import * as dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import { githubApp } from "../github/app";
import { fetchDiff } from "../github/diff";
import { getAIReview } from "../ai/review";
import { postReview } from "../github/comments";
import { findRelevantChunks } from "../db/search";
import { db } from "../db/client";
import { reviews } from "../db/schema";
import type { ReviewJobData } from "./producer";

const connection = { host: "localhost", port: 6379 };

const worker = new Worker<ReviewJobData>(
  "pr-review",
  async (job) => {
    const { owner, repo, repoFullName, pull_number, installation_id } =
      job.data;

    console.log(`\n[Worker] Processing PR #${pull_number} in ${repoFullName}`);

    const octokit = await githubApp.getInstallationOctokit(installation_id);

    // Get PR title
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

    // Save to DB
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
  { connection },
);

worker.on("completed", (job) =>
  console.log(`[Worker] Job ${job.id} completed`),
);
worker.on("failed", (job, err) =>
  console.error(`[Worker] Job ${job?.id} failed:`, err.message),
);

console.log("Worker started, waiting for jobs...");
