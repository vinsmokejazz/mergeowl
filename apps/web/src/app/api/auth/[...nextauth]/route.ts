import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.warn("WARNING: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variables are not set.");
}

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).username = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };