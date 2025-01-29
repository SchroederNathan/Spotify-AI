import { IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SongPreview = ({
  message,
  className,
}: {
  message: Message;
  className?: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [song, setSong] = useState<Track | null>(null);

  const songQuery = useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      if (!message.song) return;

      const query = new URLSearchParams({
        track: message.song.name,
        artist: message.song.artist,
        album: message.song.album,
      }).toString();

      const response = await fetch(`/api/search/song?${query}`);
      const data = await response.json();
      setSong(data);
      setLoading(false);
    };

    fetchSong();
  }, [message.song]);
  return (
    <div className={`p-3 w-fit rounded-xl bg-neutral-800 ${className}`}>
      {loading ? (
        <div className="flex flex-col h-full">
          <div className="w-full aspect-square rounded-xl bg-neutral-700 animate-pulse" />
          <div className="flex flex-col gap-2 mt-3">
            <div className="w-2/3 h-4 rounded-xl bg-neutral-700 animate-pulse" />
            <div className="w-1/3 h-4 rounded-xl bg-neutral-700 animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <a href={song!.external_urls.spotify} target="_blank" className="relative group cursor-pointer">
            <Image
              width={200}
              height={200}
              src={song!.album.images[0].url}
              alt={song?.name || "Album Cover"}
              className="rounded-xl group-hover:brightness-75 transition-all"
            />
            <IconPlayerPlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <div className="flex flex-col gap-1 mt-3">
            <p className="text-sm font-medium">{song?.name}</p>
            <p className="text-xs text-neutral-400">{song?.artists[0].name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongPreview;
