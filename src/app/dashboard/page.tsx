"use client";
import React, { useEffect, useState } from "react";
import Song from "../components/Song";
import Artist from "../components/Artist";

const Dashboard = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch("api/stats/tracks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    const fetchTopArtists = async () => {
      try {
        const response = await fetch("api/stats/artists");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTopArtists(data);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    fetchTracks();
    fetchTopArtists();
  }, []);

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4 justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold">Top Tracks</h1>
        <div className="flex flex-col gap-4 mt-4">
          {tracks.map((track, index) => (
            <Song key={index} track={track} />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Top Artists</h1>
        <div className="flex flex-col gap-4 mt-4">
          {topArtists.map((track, index) => (
            <Artist key={index} artist={track} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
