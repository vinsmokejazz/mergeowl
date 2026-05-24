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
