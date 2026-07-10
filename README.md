# 🦉 MergeOwl

> **Code review done by those who never sleep.**

MergeOwl is an AI-powered Pull Request reviewer that automatically reviews GitHub Pull Requests. By combining **Gemini 2.5 Flash** with **Retrieval-Augmented Generation (RAG)**, MergeOwl scans incoming diffs, finds relevant codebase context using **Gemini Embeddings** stored in a **Postgres database (via `pgvector`)**, and posts actionable, inline comments directly to the pull request. It also provides a sleek dashboard to monitor review analytics, repository stats, and insights.

---

## 🚀 Key Features

- **Automated PR Reviews**: Triggers instantly on `pull_request.opened` and `pull_request.synchronize` (new commits) webhook events.
- **RAG-powered Contextual Analysis**: Generates embedding vectors for the repository using `models/gemini-embedding-2` and searches for related files to provide context to the LLM during review.
- **Inline Comments**: Posts precise suggestions, warnings, and errors directly on the modified lines of code in the GitHub PR.
- **Unified Dashboard**: Next.js-based panel featuring interactive charts (Recharts) showing review volumes, severity breakdowns, and repository activity.
- **OAuth Authentication**: Secure login via GitHub OAuth for dashboard access.
- **Background Processing**: Employs BullMQ and Redis for queueing and executing asynchronous code indexing and pull request reviews.

---

## 📁 Repository Structure

MergeOwl is configured as a monorepo containing a Node.js/TypeScript backend API & worker, and a Next.js frontend application:

```text
mergeowl/
├── apps/
│   └── web/                   # Next.js 16 Frontend Web Application
│       ├── src/
│       │   ├── app/           # App router (Dashboard, settings, pricing)
│       │   ├── components/    # UI elements (charts, landing sections)
│       │   └── lib/           # Configuration and utility modules
│       ├── package.json       # Frontend package dependencies
│       └── tailwind.config.ts # Tailwind CSS configuration
├── src/                       # Express Backend & Background Worker
│   ├── ai/                    # Gemini integrations (review prompts & embeddings)
│   ├── db/                    # Drizzle ORM client, schemas, & migration SQL
│   ├── github/                # Octokit client and app webhook handlers
│   ├── queue/                 # BullMQ producers, consumers, and redis connection
│   ├── routes/                # Express API and webhook endpoints
│   ├── scripts/               # Repository indexing command-line utility
│   └── index.ts               # Main server entrypoint (Express + Queue Worker)
├── docker-compose.yml         # Dev services (PostgreSQL + pgvector, Redis)
├── drizzle.config.ts          # Drizzle ORM migration configuration
└── package.json               # Backend & root scripts package
```

---

## 🛠️ System Architecture & Workflow

```mermaid
sequenceDiagram
    participant GH as GitHub
    participant App as Express Backend
    participant Redis as Redis (BullMQ)
    participant Worker as Background Worker
    participant Gemini as Gemini AI
    participant DB as Postgres (pgvector)

    GH->>App: 1. PR Opened / Updated Webhook
    App->>Redis: 2. Enqueue review job
    App-->>GH: 200 OK Response
    Redis->>Worker: 3. Dequeue job
    Worker->>GH: 4. Fetch PR diff & details
    Worker->>DB: 5. Search similar code context (pgvector)
    DB-->>Worker: 6. Returns top semantic chunks
    Worker->>Gemini: 7. Analyze diff + context (Gemini 2.5 Flash)
    Gemini-->>Worker: 8. Return structured JSON reviews
    Worker->>GH: 9. Post inline review comments on PR
    Worker->>DB: 10. Save review statistics to database
```

### 📊 Storage & Serialization Details

To support rich review history details directly on the dashboard without hitting GitHub API rate limits or requiring OAuth user tokens to fetch comments from GitHub:
- The background worker serializes both the **AI Summary** and the **list of individual review comments** (file path, line, severity, comment body) as a JSON string into the database's `summary` column.
- The dashboard detail view (`/dashboard/reviews/detail?id=...`) parses this JSON payload dynamically to render comments in a fully interactive, collapsible UI. It gracefully falls back to raw text for legacy records.

---

## 💻 Setup & Installation

Follow these steps to set up the development environment on your local machine.

### 1. Prerequisites

Make sure you have the following installed:
- **Node.js** (v18.x or higher) and **npm**
- **Docker** and **Docker Compose**
- **GitHub Account** (to register a GitHub App and a GitHub OAuth app)
- **Gemini API Key** (from Google AI Studio)

---

### 2. Configure GitHub Apps

To integrate MergeOwl with your GitHub repositories, you need to create a **GitHub App** and a **GitHub OAuth App**:

#### A. Create the GitHub App (For PR Reviews)
1. Go to your GitHub profile settings > **Developer Settings** > **GitHub Apps** > **New GitHub App**.
2. Set the **Homepage URL** to `http://localhost:3000`.
3. Under **Webhooks**, check **Active**.
   - Set **Webhook URL** to your server's address (use tools like `ngrok` to forward to `http://localhost:3000/webhook` in development).
   - Set a secure **Webhook Secret**.
4. Set the following **Repository Permissions**:
   - **Checks**: Read & Write
   - **Contents**: Read & Write
   - **Metadata**: Read-Only
   - **Pull Requests**: Read & Write
5. Under **Subscribe to events**, check:
   - **Pull request**
6. Save changes and generate a **Private Key** (download the `.pem` file and place it in the project root as `private-key.pem`).
7. Note down your **App ID** and install the App on your target repositories.

#### B. Create the GitHub OAuth App (For Dashboard Sign-In)
1. Go to **Developer Settings** > **OAuth Apps** > **New OAuth App**.
2. Set **Homepage URL** to `http://localhost:3001`.
3. Set **Authorization callback URL** to `http://localhost:3001/api/auth/callback/github`.
4. Generate and save the **Client ID** and **Client Secret**.

---

### 3. Environment Setup

Create `.env` files in both the **root** and **web** directories:

#### Root Environment Variables (`./.env`)
```env
PORT=3000
GITHUB_APP_ID=your_github_app_id
GITHUB_WEBHOOK_SECRET=your_github_webhook_secret
GEMINI_API_KEY=your_gemini_api_key

# Database Connection (pgvector port is mapped to 5433 in docker-compose)
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/mergeowl?sslmode=disable

# Redis Connection (mapped to 6379 in docker-compose)
REDIS_URL=redis://localhost:6379

# Allowed CORS Origins (separate with commas)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

#### Frontend Environment Variables (`./apps/web/.env`)
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=generate-a-random-base64-string-here-or-use-openssl

# GitHub OAuth App Credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

### 4. Run Core Services

Run Postgres (with the `pgvector` extension) and Redis using Docker Compose:

```bash
docker compose up -d
```

Verify that both containers are running. Postgres will be listening on port `5433` and Redis on `6379`.

---

### 5. Install Dependencies & Migrate Database

From the root directory, install the required packages:

```bash
# Install backend and root dependencies
npm install

# Install frontend dependencies
cd apps/web
npm install
cd ../..
```

Now generate and run the Drizzle migrations to set up the Postgres schema:

```bash
# Generate the SQL migrations from your schema
npm run db:generate

# Execute the migrations onto the running database
npm run db:migrate
```

---

### 6. Start the Applications

You can start the backend API + worker and the frontend Next.js development server simultaneously:

#### Start Backend (Root directory)
```bash
npm run dev
```
*Note: This starts the Express server on port `3000` and automatically boots up the background queue worker.*

#### Start Frontend (`apps/web` directory)
```bash
cd apps/web
npm run dev
```
*This starts the dashboard at [http://localhost:3001](http://localhost:3001).*

---

## 🛠️ CLI Indexing Tool

If you want to pre-index a repository so that MergeOwl doesn't have to fetch embeddings on-the-fly during a PR review, you can run the indexing script manually:

```bash
npm run index-repo <owner>/<repo>
```

**Example:**
```bash
npm run index-repo vinsmokejazz/mergeowl
```
This clones the repository to a temporary directory, parses the code into chunks, runs Gemini embeddings, stores them in the database, and cleans up the temporary files.

---

## 📊 Summary of Available Scripts

### Backend & Root Scripts (`./package.json`)

| Script | Description |
|:---|:---|
| `npm run dev` | Runs the Express API and Queue Worker in hot-reload mode (`ts-node-dev`). |
| `npm run worker` | Starts the Queue Worker separately (if scaling workers). |
| `npm run db:generate` | Creates new SQL migration files inside `src/db/migrations` using Drizzle Kit. |
| `npm run db:migrate` | Applies pending database schema migrations. |
| `npm run index-repo <owner>/<repo>` | Manually clones and indexes a repository's code embeddings. |
| `npm run build` | Compiles TypeScript files into JavaScript in the `dist` directory. |
| `npm run start` | Launches the compiled production build from the `dist` directory. |

### Frontend Web Scripts (`./apps/web/package.json`)

| Script | Description |
|:---|:---|
| `npm run dev` | Starts the Next.js development server on port `3001`. |
| `npm run build` | Compiles the production build of the Next.js application. |
| `npm run start` | Boots the compiled Next.js app in production mode. |
| `npm run lint` | Runs ESLint to check for code quality and errors. |
