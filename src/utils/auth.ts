import { signOut } from "next-auth/react";

export const handleAuthError = async (error: Error) => {
  console.error("Authentication error:", error);

  // Handle 401 Unauthorized errors
  if (error instanceof Error && error.message === "Unauthorized") {
    await signOut({ redirect: true, callbackUrl: "/" });
    return;
  }

  // Handle token/session expired errors
  if (
    error?.message?.includes("token") ||
    error?.message?.includes("session")
  ) {
    await signOut({ redirect: true, callbackUrl: "/" });
    return;
  }

  // Handle other authentication errors
  if (
    error?.message?.includes("auth") ||
    error?.message?.includes("unauthorized")
  ) {
    await signOut({ redirect: true, callbackUrl: "/" });
    return;
  }

  // For other errors, you might want to show an error message to the user
  throw error;
};
