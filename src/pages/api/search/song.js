import { searchSong } from "../../../../lib/spotify";

export default async function handler(req, res) {
  try {
    // Extract track and artist from the query
    const { track, artist } = req.query;
    
    // Construct the query string
    const queryString = `track=${track}${artist ? `&artist=${artist}` : ''}`;
    
    console.log('Query string:', queryString);
    
    const response = await searchSong(queryString);
    const data = await response.json();
    
    if (!data.tracks || !data.tracks.items.length) {
      return res.status(404).json({ error: 'No tracks found' });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(data.tracks.items[0]);
  } catch (error) {
    console.error('Error searching song:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}