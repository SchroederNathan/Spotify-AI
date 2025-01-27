// pages/api/stats/artists.js

import { topArtists } from "../../../../lib/spotify";

export default async function handler(req, res) {
  const response = await topArtists({ time_range: req.query.time_range });
  const { items } = await response.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(items);
}
