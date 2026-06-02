import { Router } from "express";
import { db } from "../db/client";
import { reviews } from "../db/schema";
import { desc, eq} from "drizzle-orm";

export const apiRouter = Router();

// GET /api/reviews — all reviews
apiRouter.get("/reviews", async (req, res) => {
  try {
    const allReviews = await db
      .select()
      .from(reviews)
      .orderBy(desc(reviews.createdAt))
      .limit(50);

    res.json(allReviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reviews/:repo — reviews for a specific repo
apiRouter.get("/reviews/:owner/:repo", async (req, res) => {
  try {
    const repoFullName = `${req.params.owner}/${req.params.repo}`;
    const repoReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.repoFullName, repoFullName))
      .orderBy(desc(reviews.createdAt));

    res.json(repoReviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats — dashboard overview numbers
apiRouter.get("/stats", async (req, res) => {
  try {
    const allReviews = await db.select().from(reviews);

    const totalReviews = allReviews.length;
    const totalComments = allReviews.reduce(
      (sum, r) => sum + r.commentsCount,
      0,
    );
    const uniqueRepos = new Set(allReviews.map((r) => r.repoFullName)).size;

    res.json({ totalReviews, totalComments, uniqueRepos });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
