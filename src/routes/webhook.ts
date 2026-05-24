import { Request, Response, Router } from "express";
import { githubApp } from "../github/app";
import { addReviewJob } from "../queue/producer";

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