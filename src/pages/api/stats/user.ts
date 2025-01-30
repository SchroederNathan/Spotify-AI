import { getUser } from "../../../../lib/spotify";

export default async function handler(req: any, res: any) {
  try {
    const response = await getUser(req);
    const user = await response.json();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(user);
  } catch (error: any) {
    console.error("Error in /api/stats/user:", error.message);
    
    // Handle authentication errors
    if (error.message.includes("Not authenticated") || 
        error.message.includes("No access token found") ||
        error.message.includes("Token expired") ||
        error.message.includes("Unauthorized")) {
      return res.status(401).json({ 
        error: "Authentication required",
        message: "Please sign in again to refresh your session"
      });
    }

    return res.status(500).json({ 
      error: "Internal Server Error",
      message: error.message 
    });
  }
}
