import { Router } from "express";
import { db } from "../db/client";
import { reviews } from "../db/schema";
import { desc, eq, gte, and } from "drizzle-orm";

export const apiRouter = Router();

// GET /api/reviews — all reviews with optional filters
apiRouter.get("/reviews", async (_req, res) => {
  try {
    const { repo, status, limit = "50" } = _req.query;

    const conditions = [];
    if (repo && typeof repo === "string") {
      conditions.push(eq(reviews.repoFullName, repo));
    }
    if (status && typeof status === "string") {
      conditions.push(eq(reviews.status, status));
    }

    const allReviews = await db.query.reviews.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: [desc(reviews.createdAt)],
      limit: Number.parseInt(limit as string, 10),
    });

    res.json(allReviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reviews/:id — single review detail
apiRouter.get("/reviews/:id", async (_req, res) => {
  try {
    const id = Number.parseInt(_req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    const review = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, id))
      .limit(1);

    if (review.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(review[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reviews/:owner/:repo — reviews for a specific repo
apiRouter.get("/reviews/:owner/:repo", async (_req, res) => {
  try {
    const repoFullName = `${_req.params.owner}/${_req.params.repo}`;
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
apiRouter.get("/stats", async (_req, res) => {
  try {
    const allReviews = await db.select().from(reviews);

    const totalReviews = allReviews.length;
    const totalComments = allReviews.reduce(
      (sum, r) => sum + r.commentsCount,
      0,
    );
    const uniqueRepos = new Set(allReviews.map((r) => r.repoFullName)).size;
    const openReviews = allReviews.filter((r) => r.status === "open").length;

    res.json({ totalReviews, totalComments, uniqueRepos, openReviews });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/repos — all repositories with review counts
apiRouter.get("/repos", async (_req, res) => {
  try {
    const allReviews = await db.select().from(reviews);

    const repoMap = new Map<
      string,
      { repoFullName: string; reviewCount: number; lastReviewedAt: string; languages: Set<string> }
    >();

    for (const review of allReviews) {
      const existing = repoMap.get(review.repoFullName);
      if (existing) {
        existing.reviewCount += 1;
        if (new Date(review.createdAt) > new Date(existing.lastReviewedAt)) {
          existing.lastReviewedAt = review.createdAt;
        }
      } else {
        repoMap.set(review.repoFullName, {
          repoFullName: review.repoFullName,
          reviewCount: 1,
          lastReviewedAt: review.createdAt,
          languages: new Set(),
        });
      }
    }

    const repos = Array.from(repoMap.values()).map((repo) => ({
      name: repo.repoFullName,
      reviewCount: repo.reviewCount,
      lastReviewedAt: repo.lastReviewedAt,
    }));

    repos.sort((a, b) => new Date(b.lastReviewedAt).getTime() - new Date(a.lastReviewedAt).getTime());

    res.json(repos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/insights/daily — last 7 days review counts
apiRouter.get("/insights/daily", async (_req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const allReviews = await db
      .select()
      .from(reviews)
      .where(gte(reviews.createdAt, sevenDaysAgo.toISOString()));

    const dailyCounts = new Map<string, number>();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      const key = date.toISOString().split("T")[0];
      dailyCounts.set(key, 0);
    }

    for (const review of allReviews) {
      const dateKey = review.createdAt.split("T")[0];
      if (dailyCounts.has(dateKey)) {
        dailyCounts.set(dateKey, dailyCounts.get(dateKey)! + 1);
      }
    }

    const result = Array.from(dailyCounts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => {
        const day = new Date(date).getDay();
        return { name: dayNames[day], value: count, date };
      });

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/insights/severity — breakdown by error/warning/suggestion
apiRouter.get("/insights/severity", async (_req, res) => {
  try {
    const allReviews = await db.select().from(reviews);

    let errors = 0;
    let warnings = 0;
    let suggestions = 0;

    for (const review of allReviews) {
      const count = review.commentsCount;
      if (count > 5) {
        errors += 1;
      } else if (count > 0) {
        warnings += 1;
      } else {
        suggestions += 1;
      }
    }

    res.json([
      { name: "Errors", value: errors, fill: "#ef4444" },
      { name: "Warnings", value: warnings, fill: "#f59e0b" },
      { name: "Suggestions", value: suggestions, fill: "#22c55e" },
    ]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
