import "dotenv/config"; 
import express from "express";
import fs from "node:fs";
import { App } from "@octokit/app";

process.stdout.write("SERVER STARTED\n");
const privateKey = fs.readFileSync("./private-key.pem", "utf-8");

const githubApp = new App({
  appId: Number(process.env.GITHUB_APP_ID),
  privateKey,
  webhooks: {
    secret: process.env.GITHUB_WEBHOOK_SECRET!,
  },
});
// Register handler
githubApp.webhooks.on("pull_request.opened", ({ payload }) => {
  console.log("=== PR OPENED ===");
  console.log(`Repo: ${payload.repository.full_name}`);
  console.log(`PR #${payload.pull_request.number}`);
});

githubApp.webhooks.on("pull_request.synchronize", ({ payload }) => {
  console.log("=== PR UPDATED ===");
  console.log(`Repo: ${payload.repository.full_name}`);
});

const app = express();
const PORT = 3000;

app.post("/webhook", express.raw({ type: "*/*" }), async (req, res) => {
  process.stdout.write("=== WEBHOOK HIT ===\n");
  process.stdout.write("Event: " + req.headers["x-github-event"] + "\n");
  
  try {
    const payload = JSON.parse(req.body.toString("utf-8"));
    process.stdout.write("Action: " + payload.action + "\n");
    process.stdout.write("Repo: " + payload.repository?.full_name + "\n");
    res.status(200).send("OK");
  } catch (err: any) {
    process.stdout.write("Parse error: " + err.message + "\n");
    res.status(400).send("Bad Request");
  }
});
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server on port ${PORT}`));