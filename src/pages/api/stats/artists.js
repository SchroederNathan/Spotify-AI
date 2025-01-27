// pages/api/stats/artists.js

import { topArtists } from "../../../../lib/spotify";

export default async function handler(req, res) {
  const response = await topArtists();
  const { items } = await response.json();

  const artists = items.map((artist) => ({
    name: artist.name,
    url: artist.external_urls.spotify,
    coverImage: artist.images[1],
    followers: artist.followers.total,
  }));

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(artists);
}
