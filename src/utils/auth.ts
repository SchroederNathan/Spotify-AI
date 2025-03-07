import { signOut } from "next-auth/react";

/**
 * Handles authentication errors and performs appropriate actions
 * @param error The error object to handle
 * @returns void
 */
export const handleAuthError = async (error: any): Promise<void> => {
  console.error("Authentication error:", error);

  // Extract error message if it's wrapped in an object
  const errorMessage = error?.message || error?.error?.message || String(error);

  // Handle token refresh errors
  if (errorMessage.includes("RefreshAccessTokenError")) {
    console.error("Failed to refresh access token, signing out");
    await signOut({ redirect: true, callbackUrl: "/" });
    return;
  }

  // Handle expired tokens
  if (
    errorMessage.includes("expired") || 
    errorMessage.includes("invalid_token") ||
    errorMessage.includes("Access token expired")
  ) {
    console.error("Token expired, signing out");
    await signOut({ redirect: true, callbackUrl: "/" });
    return;
  }

  // Handle 401 Unauthorized errors
  if (
    error?.status === 401 || 
    errorMessage.includes("Unauthorized") || 
    errorMessage.includes("unauthorized")
  ) {
    console.error("Unauthorized access, signing out");
    await signOut({ redirect: true, callbackUrl: "/" });
    return;
  }

  // Handle authentication errors
  if (
    errorMessage.includes("Not authenticated") ||
    errorMessage.includes("No access token found") ||
    errorMessage.includes("auth") ||
    errorMessage.includes("token") ||
    errorMessage.includes("session")
  ) {
    console.error("Authentication issue, signing out");
    await signOut({ redirect: true, callbackUrl: "/" });
    return;
  }

  // For other errors, you might want to show an error message to the user
  console.error("Unhandled error:", errorMessage);
  throw error;
};
