import { topTracks } from "../../../../lib/spotify";

export default async function handler(req: any, res: any) {
  try {
    const response = await topTracks({ time_range: req.query.time_range }, req);
    if (!response.ok) {
      throw new Error(`Error fetching top tracks: ${response.statusText}`);
    }
    const { items } = await response.json();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
