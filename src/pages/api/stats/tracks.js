import { topTracks } from "../../../../lib/spotify";

export default async function handler(req, res) {
  try {
    const response = await topTracks({ time_range: req.query.time_range });
    if (!response.ok) {
      throw new Error(`Error fetching top tracks: ${response.statusText}`);
    }
    const { items } = await response.json();

    const tracks = items.map((track) => ({
      title: track.name,
      artist: track.artists.map((_artist) => _artist.name).join(", "),
      url: track.external_urls.spotify,
      coverImage: track.album.images[1],
    }));

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
