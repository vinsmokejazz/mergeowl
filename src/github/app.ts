import "dotenv/config"; 
import { App } from "@octokit/app";
import fs from "node:fs";


const privateKey = fs.readFileSync("./private-key.pem", "utf-8");

export const githubApp = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey,
  webhooks: {
    secret: process.env.GITHUB_WEBHOOK_SECRET!,
  },
});
