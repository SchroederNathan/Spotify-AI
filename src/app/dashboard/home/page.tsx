"use client";

import { IconArrowDown } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Overview = () => {
  const [user, setUser] = useState<User>();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/stats/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchAlbums = async () => {
      const response = await fetch("/api/stats/albums?time_range=short_term");
      const data = await response.json();
      setAlbums(data);
    };

    fetchUser();
    fetchAlbums();
  }, []);

  const AlbumImage = ({ album, index }: { album?: Album; index: number }) => (
    <div className="relative" key={index}>
      {album?.images[0]?.url ? (
        <Image
          src={album.images[0].url}
          alt={album.name || "Album cover"}
          width={176}
          height={176}
          className="aspect-square w-full rounded-xl bg-neutral-900/5 object-cover shadow-lg"
        />
      ) : (
        <div className="aspect-square w-full rounded-xl bg-neutral-800 animate-pulse" />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-neutral-900/10 ring-inset" />
    </div>
  );

  return (
    <div className="relative isolate">
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-neutral-700 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-neutral-800">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
      >
        <div
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
          className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-green-500 to-green-300 opacity-20"
        />
      </div>
      <div className="overflow-visible">
        <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8 ">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-5xl font-semibold tracking-tight text-pretty sm:text-7xl">
                Welcome, <br />
                {user?.display_name}
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-neutral-400 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                Explore your listening history and discover your top songs,
                artists, and more!
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md flex h-12 items-center gap-x-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  View Stats
                  <IconArrowDown size={18} />
                </a>
              </div>
            </div>
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-36 lg:pl-0">
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <AlbumImage album={albums[0]} index={0} />
              </div>
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <AlbumImage album={albums[1]} index={1} />
                <AlbumImage album={albums[2]} index={2} />
              </div>
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <AlbumImage album={albums[3]} index={3} />
                <AlbumImage album={albums[4]} index={4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
