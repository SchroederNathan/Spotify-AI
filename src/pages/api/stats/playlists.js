import { userPlaylists } from "../../../../lib/spotify";

export default async function handler(req, res) {
  try {
    const response = await userPlaylists();
    if (!response.ok) {
      throw new Error(`Error fetching playlists: ${response.statusText}`);
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
