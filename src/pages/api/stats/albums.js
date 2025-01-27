// pages/api/stats/albums.js

import { topAlbums } from "../../../../lib/spotify";

export default async function handler(req, res) {
  const response = await topAlbums({ time_range: req.query.time_range });
  const { items } = await response.json();

  // Create a map to count occurrences of each album
  const albumMap = new Map();

  // Process each track and count album occurrences
  items.forEach((track) => {
    const album = track.album;
    const albumId = album.id;

    if (albumMap.has(albumId)) {
      albumMap.set(albumId, {
        count: albumMap.get(albumId).count + 1,
        album: album,
      });
    } else {
      albumMap.set(albumId, {
        count: 1,
        album: album,
      });
    }
  });

  // Convert map to array and sort by count
  const sortedAlbums = Array.from(albumMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 20) // Limit to top 20 albums by play count
    .map((item) => item.album);

  // Replace items with processed album data
  const albums = sortedAlbums;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(albums);
}
