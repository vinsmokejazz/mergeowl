import { Request, Response, Router } from "express";
import { githubApp } from "../github/app";
import { fetchDiff } from "../github/diff";
import { getAIReview } from "../ai/review";
import { postReview } from "../github/comments";
import { findRelevantChunks } from "../db/search";

export const webhookRouter = Router();

// Webhook endpoint
webhookRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log("=== WEBHOOK HIT ===");
    console.log("Event:", req.headers["x-github-event"]);
    console.log("Body type:", typeof req.body);

    await githubApp.webhooks.verifyAndReceive({
      id: (req.headers["x-github-delivery"] as string) || "dummy-id",
      name: req.headers["x-github-event"] as any,
      signature: req.headers["x-hub-signature-256"] as string,
      payload: req.body,
    });

    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(400).send("Bad Request");
  }
});

// PR opened
githubApp.webhooks.on("pull_request.opened", async ({ payload }) => {
  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;
  const repoFullName = payload.repository.full_name;
  const pull_number = payload.pull_request.number;
  const installation_id = payload.installation?.id;

  if (!installation_id) {
    console.error("No installation ID in payload — skipping");
    return;
  }

  // Get installation-level octokit with full REST API access
  const octokit = await githubApp.getInstallationOctokit(installation_id);
  console.log("Installation octokit keys:", Object.keys(octokit));

  console.log(`\nReviewing PR #${pull_number} in ${owner}/${repo}...`);

  try {
    const { files, diffText } = await fetchDiff(
      octokit,
      owner,
      repo,
      pull_number,
    );
    console.log(`Fetched diff: ${files.length} files changed`);

    // Fetch relevant codebase context from pgvector
    const contextChunks = await findRelevantChunks(repoFullName, diffText);
    console.log(`Found ${contextChunks.length} relevant context chunks`);

    const review = await getAIReview(diffText);
    console.log(`AI review ready: ${review.reviews.length} comments`);
    console.log(`Summary: ${review.summary}`);

    await postReview(
      octokit,
      owner,
      repo,
      pull_number,
      review.summary,
      review.reviews,
      files,
    );
    console.log("=== Review posted successfully! ===");
  } catch (error: any) {
    console.error("Review failed:", error.message);
  }
});

// PR updated with new commits
githubApp.webhooks.on("pull_request.synchronize", async ({ payload }) => {
  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;
  const repoFullName = payload.repository.full_name;
  const pull_number = payload.pull_request.number;
  const installation_id = payload.installation?.id;

  if (!installation_id) {
    console.error("No installation ID in payload — skipping");
    return;
  }

  const octokit = await githubApp.getInstallationOctokit(installation_id);

  console.log(`\nRe-reviewing PR #${pull_number} after new commits...`);

  try {
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
    console.log("=== Re-review posted! ===");
  } catch (error: any) {
    console.error("Re-review failed:", error.message);
  }
});
