"use client";

import { useEffect, useState } from "react";

const Playlists = () => {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("api/stats/playlists");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPlaylists(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul role="list" className="divide-y divide-neutral-800">
      {playlists.map((playlist, index) => (
        <li key={playlist.name} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4 items-center">
            <span className="text-sm text-neutral-400 w-4">{index + 1}.</span>
            {playlist.images && playlist.images.length > 0 && (
            <img
              alt="Playlist Cover Image"
              src={playlist.images[0].url}
              className="size-12 flex-none rounded bg-neutral-800"
            />
          )}
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-white">{playlist.name}</p>
              <p className="mt-1 truncate text-xs/5 text-neutral-400">
                {playlist.description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Playlists;
