import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../../lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await getUser(req);
    const user = await response.json();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in /api/stats/user:", error);
  }
}
