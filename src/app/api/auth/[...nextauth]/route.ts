import { type NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

const options: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      authorization: {
        params: {
          scope:
            "user-read-email playlist-read-private playlist-modify-private playlist-modify-public user-top-read user-read-recently-played",
        },
      },
    }),
  ],
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresAt = token.expiresAt as number;
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("Sign in attempt:", { user, account, profile });
      if (!account || !profile) {
        console.error("Missing account or profile");
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/",
    error: "/", // Redirect to home page on error
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
