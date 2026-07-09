import { Request, Response, Router } from "express";
import { githubApp } from "../github/app";
import { addReviewJob, addIndexJob } from "../queue/producer";
import { db } from "../db/client";
import { installations } from "../db/schema";
import { eq } from "drizzle-orm";

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
      payload: req.body as string,
    });

    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(400).send("Bad Request");
  }
});

// PR opened
githubApp.webhooks.on("pull_request.opened", async ({ payload }) => {
  const installation_id = payload.installation?.id;
  if (!installation_id) return;

  await addReviewJob({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    repoFullName: payload.repository.full_name,
    pull_number: payload.pull_request.number,
    installation_id,
  });
});

// PR updated with new commits
githubApp.webhooks.on("pull_request.synchronize", async ({ payload }) => {
  const installation_id = payload.installation?.id;
  if (!installation_id) return;

  await addReviewJob({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    repoFullName: payload.repository.full_name,
    pull_number: payload.pull_request.number,
    installation_id,
  });
});

// App installed
githubApp.webhooks.on("installation.created", async ({ payload }) => {
  const installationId = payload.installation.id;
  const accountLogin = payload.installation.account.login;
  const accountType = payload.installation.account.type;

  console.log(`[Webhook] App installed on ${accountLogin} (ID: ${installationId})`);

  try {
    // Record installation
    await db.insert(installations).values({
      installationId,
      accountLogin,
      accountType,
    });
  } catch (err: any) {
    console.warn("[Webhook] Failed to insert installation record (might already exist):", err.message);
  }

  // Index connected repositories
  if (payload.repositories) {
    for (const repo of payload.repositories) {
      console.log(`[Webhook] Queueing dynamic indexing for connected repo: ${repo.full_name}`);
      await addIndexJob({
        repoFullName: repo.full_name,
        installationId,
      });
    }
  }
});

// App uninstalled
githubApp.webhooks.on("installation.deleted", async ({ payload }) => {
  const installationId = payload.installation.id;
  console.log(`[Webhook] App uninstalled (ID: ${installationId})`);

  try {
    await db.delete(installations).where(eq(installations.installationId, installationId));
  } catch (err: any) {
    console.error("[Webhook] Failed to delete installation record:", err.message);
  }
});

// Repositories added to existing installation
githubApp.webhooks.on("installation_repositories.added", async ({ payload }) => {
  const installationId = payload.installation.id;
  console.log(`[Webhook] Repositories added to installation (ID: ${installationId})`);

  if (payload.repositories_added) {
    for (const repo of payload.repositories_added) {
      console.log(`[Webhook] Queueing dynamic indexing for newly added repo: ${repo.full_name}`);
      await addIndexJob({
        repoFullName: repo.full_name,
        installationId,
      });
    }
  }
});