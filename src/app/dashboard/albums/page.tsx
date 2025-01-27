"use client";

import { useEffect, useState } from "react";

const Songs = () => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("api/stats/albums");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAlbums(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul role="list" className="divide-y divide-neutral-800">
      {albums.map((album, index) => (
        <li key={album.title} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4 items-center">
            <span className="text-sm text-neutral-400 w-4">{index + 1}.</span>
            <img
              alt="Track Cover Image"
              src={album.coverImage.url}
              className="size-12 flex-none rounded bg-neutral-800"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-white">{album.title}</p>
              <p className="mt-1 truncate text-xs/5 text-neutral-400">
                {album.artist}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Songs;
