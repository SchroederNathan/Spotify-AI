import { Button } from "@headlessui/react";
import { IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const PlaylistPreview = ({
  message,
  className,
}: {
  message: Message;
  className?: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<Track[] | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      if (!message.playlist) return;

      const songs = message.playlist.songs.map(async (song: any) => {
        const query = new URLSearchParams({
          track: song.name,
          artist: song.artist,
          album: song.album,
        }).toString();

        try {
          const response = await fetch(`/api/search/song?${query}`);
          const data = await response.json();

          if (data.error) {
            return null;
          }
          return data;
        } catch (error) {
          console.error("Error fetching song:", error);
          return null;
        }
      });

      const results = await Promise.all(songs);
      const validSongs = results.filter((song): song is Track => song !== null);
      setSongs(validSongs);
      setLoading(false);
    };

    fetchSongs();
  }, [message.playlist]);

  return (
    <>
      {loading ? (
        <div className={`rounded-xl bg-neutral-800 max-w-[80%] ${className}`}>
          <div className="border-b border-neutral-700 px-4 py-5 sm:px-6">
            <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="mt-2 ml-4">
                <div className="h-4 w-32 rounded-xl bg-neutral-700 animate-pulse" />
              </div>
              <div className="mt-2 ml-4 shrink-0">
                <div className="h-8 w-24 rounded-md bg-neutral-700 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="flex flex-col h-full">
              <div className="w-[200px] aspect-square rounded-xl bg-neutral-700 animate-pulse" />
              <div className="flex flex-col gap-2 mt-3">
                <div className="w-2/3 h-4 rounded-xl bg-neutral-700 animate-pulse" />
                <div className="w-1/3 h-4 rounded-xl bg-neutral-700 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`rounded-xl bg-neutral-800 max-w-[80%] ${className}`}>
          <div className="border-b border-neutral-700 px-3 py-3">
            <div className="-mt-2  flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="mt-2">
                <h3 className="text-base font-semibold text-white mr-3">
                  {message.playlist?.name}
                </h3>
              </div>
              <div className="mt-2 shrink-0">
                <Button
                  type="button"
                  className="relative inline-flex cursor-pointer items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  <Image
                    width={24}
                    height={24}
                    src="/images/spotify-logo-white.png"
                    alt="Spotify"
                    className="mr-2"
                  />
                  Create Playlist
                </Button>
              </div>
            </div>
          </div>
          <div className="p-3 flex gap-3 overflow-x-auto">
            {songs?.map((song, index) => (
              <div className="flex flex-col h-full min-w-[200px]" key={index}>
                <a
                  href={song.external_urls.spotify}
                  target="_blank"
                  className="relative group cursor-pointer"
                >
                  <Image
                    width={200}
                    height={200}
                    src={song.album.images[0].url}
                    alt={song.name || "Album Cover"}
                    className="rounded-lg group-hover:brightness-75 transition-all"
                  />
                  <IconPlayerPlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <div className="flex flex-col gap-1 mt-3">
                  <p className="text-sm font-medium">{song.name}</p>
                  <p className="text-xs text-neutral-400">
                    {song.artists[0].name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistPreview;
