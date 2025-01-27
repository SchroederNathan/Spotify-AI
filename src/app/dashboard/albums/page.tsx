"use client";

import TimeRange, { TimeRanges } from "@/app/components/TimeRange";
import { time } from "console";
import { useEffect, useState } from "react";

const Albums = () => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [timeRange, setTimeRange] = useState(TimeRanges.Short);
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          `api/stats/albums?time_range=${timeRange}`
        );
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
  }, [timeRange]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />

      <ul role="list" className="divide-y divide-neutral-800">
        {albums.map((album, index) => (
          <li key={album.name} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4 items-center">
              <span className="text-sm text-neutral-400 w-4">{index + 1}.</span>
              <img
                alt="Track Cover Image"
                src={album.images[0].url}
                className="size-12 flex-none rounded bg-neutral-800"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-white">
                  {album.name}
                </p>
                <p className="mt-1 truncate text-xs/5 text-neutral-400">
                  {album.artists[0].name}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Albums;
