import middleware from "next-auth/middleware";

export default middleware;

export const config = {
  matcher: ["/dashboard/:path*"],
};
