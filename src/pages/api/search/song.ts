import { NextApiRequest, NextApiResponse } from 'next';
import { searchSong } from "../../../../lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Track | { error: string }>
) {
  try {
    // Extract track and artist from the query
    const { track, artist, album } = req.query;

    if (!track) {
      return res.status(400).json({ error: "Track name is required" });
    }

    // Create proper query string with URLSearchParams
    const queryParams = new URLSearchParams({
      track: Array.isArray(track) ? track[0] : track,
      ...(artist && { artist: Array.isArray(artist) ? artist[0] : artist }),
      ...(album && { album: Array.isArray(album) ? album[0] : album }),
    });

    console.log("Query string:", queryParams);

    const response = await searchSong(queryParams, req);
    const data = await response.json();

    if (!data.tracks || !data.tracks.items.length) {
      return res.status(404).json({ error: "No tracks found" });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(data.tracks.items[0]);
  } catch (error) {
    console.error("Error searching song:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
