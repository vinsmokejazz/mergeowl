type ReviewComment = {
  file: string;
  line: number;
  severity: string;
  comment: string;
};

export async function postReview(
  octokit: any,
  owner: string,
  repo: string,
  pull_number: number,
  summary: string,
  reviews: ReviewComment[],
  files: any[]
) {
  const validFiles = new Set(files.map((f: any) => f.filename));

  const validComments = reviews
    .filter((r) => validFiles.has(r.file))
    .map((r) => ({
      path: r.file,
      line: r.line,
      body: `**[${r.severity.toUpperCase()}]** ${r.comment}`,
    }));

  await octokit.request(
    "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
    {
      owner,
      repo,
      pull_number,
      body: `## MergeOwl AI Review\n\n${summary}`,
      event: "COMMENT",
      comments: validComments,
    }
  );

  console.log(`Posted review with ${validComments.length} comments`);
}