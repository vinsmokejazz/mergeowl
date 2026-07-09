import * as dotenv from "dotenv";
dotenv.config();

// ALL other imports after dotenv
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { execSync } from "node:child_process";
import { indexRepository } from "../db/indexer";

async function main() {
  const repoFullName = process.argv[2];
  if (!repoFullName) {
    console.error("Error: Please provide a repository name (e.g. owner/repo) as a command line argument.");
    console.error("Usage: npm run index-repo <owner>/<repo>");
    console.error("Example: npm run index-repo vinsmokejazz/learning-log");
    process.exit(1);
  }
  const repoUrl = `https://github.com/${repoFullName}.git`;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mergeowl-"));
  console.log(`Cloning ${repoFullName} to ${tmpDir}...`);

  execSync(`git clone ${repoUrl} ${tmpDir}`, { stdio: "inherit" });

  await indexRepository(repoFullName, tmpDir);

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log("Done!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});