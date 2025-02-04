"use client";

import LoadingSkeleton from "@/app/components/LoadingSkeleton";
import TimeRange, { TimeRanges } from "@/app/components/TimeRange";
import Image from "next/image";
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

  return (
    <>
      <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      <ul role="list" className="divide-y divide-neutral-800">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <LoadingSkeleton index={index + 1} />
              </li>
            ))
          : songs.map((song, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4 items-center">
                  <span className="text-sm text-neutral-400 w-4">
                    {index + 1}.
                  </span>
                  <Image
                    alt="Track Cover Image"
                    src={song.album.images[0].url}
                    width={48}
                    height={48}
                    className="flex-none rounded bg-neutral-800"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-white">
                      {song.name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-neutral-400">
                      {song.artists[0].name}
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
