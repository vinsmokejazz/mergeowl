// Fetch the diff
export async function fetchDiff(
  octokit: any,
  owner: string,
  repo: string,
  pull_number: number,
) {
  const { data: files } = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number,
  });

  let diffText = "";
  for (const file of files) {
    if (!file.patch) continue;
    diffText += `\n### File: ${file.filename}\n`;
  }
  return { files, diffText };
}
