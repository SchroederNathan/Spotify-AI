import { getUser } from "../../../../lib/spotify";

export default async function handler(req, res) {
  try {
    const response = await getUser();
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    const user = await response.json();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
