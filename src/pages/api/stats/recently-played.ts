import { NextApiRequest, NextApiResponse } from "next";
import { recentlyPlayed } from "../../../../lib/spotify";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await recentlyPlayed(
      req,
      req.query.limit ? parseInt(req.query.limit as string) : undefined
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching recently played tracks: ${response.statusText}`
      );
    }
    const { items } = await response.json();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
