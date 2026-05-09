export async function fetchDiff(
  octokit: any,
  owner: string,
  repo: string,
  pull_number: number,
) {
  const { data: files } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
    { owner, repo, pull_number }
  );

  let diffText = "";
  for (const file of files) {
    if (!file.patch) continue;
    diffText += `\n### File: ${file.filename}\n`;
    diffText += file.patch;
  }

  return { files, diffText };
}