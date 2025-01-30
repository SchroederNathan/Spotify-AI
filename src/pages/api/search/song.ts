import { searchSong } from "../../../../lib/spotify";

export default async function handler(req: any, res: any) {
  try {
    // Extract track and artist from the query
    const { track, artist, album } = req.query;

    if (!track) {
      return res.status(400).json({ error: "Track name is required" });
    }

    // Create proper query string with URLSearchParams
    const queryParams = new URLSearchParams({
      track: track,
      ...(artist && { artist: artist }),
      ...(album && { album: album }),
    }).toString();

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
