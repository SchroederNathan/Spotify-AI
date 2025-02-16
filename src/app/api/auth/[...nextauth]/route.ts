import { type NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Missing required environment variables");
}

const options: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId,
      clientSecret,
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
      session.userId = token.sub as string;
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        console.log("Sign in attempt:", { user, account, profile });

        if (!account || !profile) {
          console.error("Missing account or profile");
          throw new Error("Invalid authentication response");
        }

        // Validate required Spotify permissions
        const requiredScopes = [
          "user-read-email",
          "playlist-read-private",
          "playlist-modify-private",
          "playlist-modify-public",
          "user-top-read",
          "user-read-recently-played",
        ];

        const grantedScopes = account.scope?.split(" ") || [];
        const missingScopes = requiredScopes.filter(
          (scope) => !grantedScopes.includes(scope)
        );

        if (missingScopes.length > 0) {
          console.error("Missing required scopes:", missingScopes);
          throw new Error("Insufficient permissions");
        }

        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
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
