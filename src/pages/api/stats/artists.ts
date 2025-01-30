// pages/api/stats/artists.js

import { topArtists } from "../../../../lib/spotify";

export default async function handler(req: any, res: any) {
  const response = await topArtists(req.query.time_range, req);
  const { items } = await response.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(items);
}
