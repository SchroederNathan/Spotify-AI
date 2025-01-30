import { topGenres } from "../../../../lib/spotify";

export default async function handler(req: any, res: any) {
  const response = await topGenres(req, req.query.time_range);
  const { items } = await response.json();

  // Create a map to count genre occurrences
  const genreCounts = new Map();

  // Count occurrences of each genre across all artists
  items.forEach((artist: any) => {
    artist.genres.forEach((genre: any) => {
      genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
    });
  });

  // Convert map to array of [genre, count] pairs and sort by count
  const sortedGenres = Array.from(genreCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([genre]) => genre);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(sortedGenres);
}
