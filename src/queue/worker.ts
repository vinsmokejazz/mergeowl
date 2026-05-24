import * as dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import { githubApp } from "../github/app";
import { fetchDiff } from "../github/diff";
import { getAIReview } from "../ai/review";
import { postReview } from "../github/comments";
import { findRelevantChunks } from "../db/search";
import type { ReviewJobData } from "./producer";

const connection = {
  host: "localhost",
  port: 6379,
};

const worker = new Worker<ReviewJobData>(
  "pr-review",
  async (job) => {
    const { owner, repo, repoFullName, pull_number, installation_id } =
      job.data;

    console.log(`\n[Worker] Processing PR #${pull_number} in ${repoFullName}`);

    const octokit = await githubApp.getInstallationOctokit(installation_id);

    const { files, diffText } = await fetchDiff(
      octokit,
      owner,
      repo,
      pull_number,
    );
    console.log(`[Worker] Fetched diff: ${files.length} files`);

    const contextChunks = await findRelevantChunks(repoFullName, diffText);
    console.log(`[Worker] Found ${contextChunks.length} context chunks`);

    const review = await getAIReview(diffText, contextChunks);
    console.log(`[Worker] Review ready: ${review.reviews.length} comments`);

    await postReview(
      octokit,
      owner,
      repo,
      pull_number,
      review.summary,
      review.reviews,
      files,
    );
    console.log(`[Worker]  Review posted for PR #${pull_number}`);
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
});

console.log("Worker started, waiting for jobs...");
