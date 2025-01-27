"use client";

import TimeRange, { TimeRanges } from "@/app/components/TimeRange";
import { useEffect, useState } from "react";

const Songs = () => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<Track[]>([]);
  const [timeRange, setTimeRange] = useState(TimeRanges.Short);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch(
          `api/stats/tracks?time_range=${timeRange}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSongs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchTracks();
  }, [timeRange]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      <ul role="list" className="divide-y divide-neutral-800">
        {songs.map((song, index) => (
          <li key={song.title} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4 items-center">
              <span className="text-sm text-neutral-400 w-4">{index + 1}.</span>
              <img
                alt="Track Cover Image"
                src={song.coverImage.url}
                className="size-12 flex-none rounded bg-neutral-800"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-white">
                  {song.title}
                </p>
                <p className="mt-1 truncate text-xs/5 text-neutral-400">
                  {song.artist}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Songs;
