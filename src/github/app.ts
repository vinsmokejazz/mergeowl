import { App } from "@octokit/app";
import fs from "node:fs";

// Support both file path (local dev) and env var (production)
const privateKey = process.env.GITHUB_PRIVATE_KEY
  ? process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, "\n")
  : fs.readFileSync("./private-key.pem", "utf-8");

export const githubApp = new App({
  appId: Number(process.env.GITHUB_APP_ID),
  privateKey,
  webhooks: {
    secret: process.env.GITHUB_WEBHOOK_SECRET!,
  },
});