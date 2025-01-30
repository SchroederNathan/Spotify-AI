import { NextApiRequest, NextApiResponse } from "next";
import { createPlaylist } from "../../../../lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, tracks } = req.body;

    if (!name || !tracks || !Array.isArray(tracks)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Extract URIs from the tracks
    const uris = tracks.map((track: any) => track.uri);

    const playlist = await createPlaylist(name, uris, req);

    return res.status(200).json(playlist);
  } catch (error) {
    console.error("Error creating playlist:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
