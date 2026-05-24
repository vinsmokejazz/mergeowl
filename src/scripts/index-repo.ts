import * as dotenv from "dotenv";
dotenv.config();

// ALL other imports after dotenv
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { execSync } from "node:child_process";
import { indexRepository } from "../db/indexer";

async function main() {

  // for now testing repo is hardcoded
  const repoFullName = "vinsmokejazz/learning-log";
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