import {
  pgTable,
  serial,
  text,
  integer,
  index,
  customType,
} from "drizzle-orm/pg-core";

// Tell Drizzle about the vector type (pgvector isn't natively supported yet)
const vector = (name: string, dimensions: number) =>
  customType<{ data: number[]; driverData: string }>({
    dataType() {
      return `vector(${dimensions})`;
    },
    fromDriver(value: string): number[] {
      // Postgres returns vector as string "[0.1,0.2,...]" — parse it
      return value.slice(1, -1).split(",").map(Number);
    },
    toDriver(value: number[]): string {
      return `[${value.join(",")}]`;
    },
  })(name);

export const codeEmbeddings = pgTable(
  "code_embeddings",
  {
    id: serial("id").primaryKey(),
    repoFullName: text("repo_full_name").notNull(), // "owner/repo"
    filePath: text("file_path").notNull(), // "src/auth.ts"
    chunkText: text("chunk_text").notNull(), // the actual code
    startLine: integer("start_line").notNull(), // where chunk starts
    endLine: integer("end_line").notNull(), // where chunk ends
    embedding: vector("embedding", 3072), // Gemini embedding dimensions
  },
  (table) => ({
    repoIdx: index("repo_idx").on(table.repoFullName),
  }),
);

export const installations = pgTable("installations", {
  id: serial("id").primaryKey(),
  installationId: integer("installation_id").notNull().unique(),
  accountLogin: text("account_login").notNull(),
  accountType: text("account_type").notNull(), // "User" or "Organization"
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  repoFullName: text("repo_full_name").notNull(),
  pullNumber: integer("pull_number").notNull(),
  pullTitle: text("pull_title").notNull(),
  commentsCount: integer("comments_count").notNull().default(0),
  summary: text("summary"),
  status: text("status").notNull().default("completed"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});
