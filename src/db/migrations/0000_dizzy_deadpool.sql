CREATE TABLE "code_embeddings" (
	"id" serial PRIMARY KEY NOT NULL,
	"repo_full_name" text NOT NULL,
	"file_path" text NOT NULL,
	"chunk_text" text NOT NULL,
	"start_line" integer NOT NULL,
	"end_line" integer NOT NULL,
	"embedding" vector(768)
);
--> statement-breakpoint
CREATE INDEX "repo_idx" ON "code_embeddings" USING btree ("repo_full_name");