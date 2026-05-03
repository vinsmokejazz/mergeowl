import { githubApp } from "./app";

export function registerWebhookHandlers() {
  githubApp.webhooks.on("pull_request.opened", async ({ octokit, payload }) => {
    console.log("===PR OPENED===");
    console.log(`Repo: ${payload.repository.full_name}`);
    console.log(
      `PR #${payload.pull_request.number}: ${payload.pull_request.title}`,
    );
    console.log(`Author: ${payload.pull_request.user.login}`);

    await fetchAndLogDiff({ octokit, payload });
  });
}

// handle new commits pushed into existing PR
githubApp.webhooks.on(
  "pull_request.synchronize",
  async ({ octokit, payload }) => {
    console.log("=== PR UPDATED(new commits) ===");
    await fetchAndLogDiff({ octokit, payload });
  },
);

githubApp.webhooks.onError((error) => {
  console.error("Webhook error:", error);
});

async function fetchAndLogDiff({
  octokit,
  payload,
}: {
  octokit: any;
  payload: any;
}) {
  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;
  const pull_number = payload.pull_request.number;

  console.log(`\nFetching diff for ${owner}/${repo} PR #${pull_number}...`);

  // fetch list of changed files
  const { data: files } = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number,
  });
  console.log(`\nChanged files (${files.length} total):`);

  for (const file of files) {
    console.log(`\n--- ${file.filename} (${file.status}) ---`);
    console.log(`  +${file.additions} additions, -${file.deletions} deletions`);

    if (file.path) {
      // patch is the actual diff text
      console.log(file.patch.slice(0, 500)); // first 500 chars to keep logs readable
    }
  }
}
