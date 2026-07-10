# 🦉 MergeOwl Web Application

This directory contains the Next.js frontend web application for MergeOwl. It provides a sleek, modern dashboard for users to review PR statistics, inspect severity breakdowns, view recent repository reviews, and check insights.

## 🚀 Features

- **Dashboard Statistics**: Total PRs reviewed, comments posted, unique repositories, and active alerts.
- **Insights & Visualizations**:
  - **Daily Volume**: Interactive bar chart showing PR review volumes over the last 7 days.
  - **Severity Breakdown**: Color-coded doughnut/pie chart showing suggesting vs. warning vs. critical error ratios.
- **Recent Repositories**: Listing of connected repositories with their review counts and timestamps.
- **OAuth Authentication**: Uses GitHub Sign-In powered by NextAuth.js.
- **Responsive Layout**: Dark-themed, glassmorphic design that works across desktop and mobile screens.

---

## 🛠️ Key Technologies

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Icons**: [Lucide React](https://lucide.dev)
- **Charts**: [Recharts](https://recharts.org) / [Chart.js](https://www.chartjs.org)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 💻 Development & Configuration

All system configurations, prerequisites, Docker Compose configurations (Postgres/Redis), backend integration details, and overall monorepo structure are documented in the main [Root README.md](../../README.md).

### Quick Start for Web

1. **Environment Variables**:
   Create a `.env` file in this directory (`apps/web/.env`) based on the `.env.example` template:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=generate-a-random-base64-string-here

   # GitHub OAuth Application (Register at GitHub Settings -> Developer Settings)
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   # Backend API URL
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Next.js Development Server**:
   ```bash
   npm run dev
   ```
   The dashboard will be accessible at [http://localhost:3001](http://localhost:3001).

---

## 📊 Summary of Scripts

| Script | Description |
|:---|:---|
| `npm run dev` | Runs the Next.js development server on port `3001` with hot reloading. |
| `npm run build` | Builds the optimized production package. |
| `npm run start` | Starts the production server for the Next.js web application. |
| `npm run lint` | Analyzes code quality using ESLint. |
