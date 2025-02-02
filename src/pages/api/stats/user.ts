import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../../lib/spotify";

export const handleApiError = (error: Error, res: NextApiResponse) => {
  console.error("API Error:", error);

  if (error.message === "Not authenticated") {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Not authenticated" });
  }

  if (error.message === "No access token found") {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Invalid token" });
  }

  // Handle Spotify API errors
  if (error instanceof Error && error.message === "Unauthorized") {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Spotify token expired" });
  }

  return res
    .status(500)
    .json({ error: "Internal Server Error", message: error.message });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await getUser(req);
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }
    const user = await response.json();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(user);
  } catch (error) {
    return handleApiError(error as Error, res);
  }
}
