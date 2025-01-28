"use client";

import LoadingSkeleton from "@/app/components/LoadingSkeleton";
import TimeRange, { TimeRanges } from "@/app/components/TimeRange";
import { useEffect, useState } from "react";

const Genres = () => {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState(TimeRanges.Short);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `api/stats/genres?time_range=${timeRange}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGenres(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchGenres();
  }, [timeRange]);

  return (
    <>
      <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />

      <ul role="list" className="divide-y divide-neutral-800">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <li key={index} className="flex  gap-x-3 py-5">
                <span className="text-sm text-neutral-400 w-4">{index + 1}.</span>
                <p className="w-32 h-2 rounded-sm bg-neutral-700 animate-pulse"></p>              </li>
            ))
          : genres.map((genre, index) => (
              <li key={genre} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4 items-center">
              <span className="text-sm text-neutral-400 w-4">{index + 1}.</span>
              <p className="text-sm/6 font-semibold text-white">{genre}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Genres;
