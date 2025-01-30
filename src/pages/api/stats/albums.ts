// pages/api/stats/albums.js

import { topAlbums } from "../../../../lib/spotify";

export default async function handler(req: any, res: any) {
  try {
    const response = await topAlbums(req, req.query.time_range);
    if (!response.ok) {
      throw new Error(`Error fetching top albums: ${response.statusText}`);
    }
    const { items } = await response.json();

    // Create a map to count occurrences of each album
    const albumMap = new Map();

    // Process each track and count album occurrences
    items.forEach((track: any) => {
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
  } catch (error) {
    console.error("Error in /api/stats/albums:", error);
    return res.status(500).json({ error: error });
  }
}
