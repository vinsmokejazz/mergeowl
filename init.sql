CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE IF NOT EXISTS code_embeddings (id serial PRIMARY KEY NOT NULL, repo_full_name text NOT NULL, file_path text NOT NULL, chunk_text text NOT NULL, start_line integer NOT NULL, end_line integer NOT NULL, embedding vector(3072));
CREATE INDEX IF NOT EXISTS repo_idx ON code_embeddings USING btree (repo_full_name);
