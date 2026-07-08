export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const config = {
  apiBase: API_BASE,
  nextAuthUrl: process.env.NEXTAUTH_URL || "http://localhost:3001",
} as const;
