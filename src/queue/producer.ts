import { Queue } from "bullmq";

import { connection } from "./redis";

export const reviewQueue = new Queue("pr-review", { connection: connection as any });

export interface ReviewJobData {
  owner: string;
  repo: string;
  repoFullName: string;
  pull_number: number;
  installation_id: number;
}

export async function addReviewJob(data: ReviewJobData): Promise<void> {
  await reviewQueue.add("review", data, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  });

  console.log(
    `Job added to queue: PR #${data.pull_number} in ${data.repoFullName}`,
  );
}
