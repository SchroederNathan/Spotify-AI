// pages/api/stats/artists.js

import { NextApiRequest, NextApiResponse } from "next";
import { topArtists } from "../../../../lib/spotify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await topArtists(req.query.time_range as string, req);
  const { items } = await response.json();

  res.setHeader(    
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(items);
}
