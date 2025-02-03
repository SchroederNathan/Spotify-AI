import { Button } from "@headlessui/react";
import { IconAlignJustified, IconShare2 } from "@tabler/icons-react";
import Image from "next/image";
import LoadingSkeleton from "./LoadingSkeleton";

export default function TopAlbumsCard({
  loading,
  albums,
}: {
  loading: boolean;
  albums: Album[];
}) {
  return (
    <div className="w-full">
      <div className="flex-row flex justify-between">
        <p className=" max-w-lg text-4xl font-semibold tracking-tight text-balance text-neutral-200 sm:text-5xl">
          Top Albums
        </p>
        <div className="flex flex-row gap-x-2">
          <Button className="bg-neutral-800/50 backdrop-blur-lg shadow-sm text-white flex flex-row items-center gap-x-2 px-4 rounded-lg hover:bg-green-600 cursor-pointer transition-colors">
            <IconShare2 size={18} />
          </Button>
          <Button
            // onClick={() => {}}
            className="bg-neutral-800/50 backdrop-blur-lg shadow-sm text-white flex flex-row items-center gap-x-2 px-4 rounded-lg hover:bg-green-500/50 cursor-pointer transition-colors"
          >
            <IconAlignJustified size={18} />
            <p className="text-sm font-medium hidden sm:block">
              View All Tracks
            </p>
          </Button>
        </div>
      </div>
      <div className="overflow-hidden  rounded-lg bg-neutral-800/50 backdrop-blur-lg shadow-sm mt-3 sm:mt-4 md:mt-6">
        <div className="px-4 py-3 sm:px-6">
          <ul role="list" className="divide-y divide-neutral-700">
            {loading ? (
              <li key={1} className="flex justify-between gap-x-6 py-5">
                <LoadingSkeleton index={1} />
              </li>
            ) : (
              albums.slice(0, 1).map((album, index) => (
                <li
                  key={album.name}
                  className="flex justify-between gap-x-6  py-5"
                >
                  <div className="flex min-w-0 gap-x-4 items-center">
                    <span className="text-sm text-neutral-400 w-4">
                      {index + 1}.
                    </span>
                    <Image
                      alt="Album Cover Image"
                      src={album.images[0].url}
                      width={140}
                      height={140}
                      className="flex-none rounded bg-neutral-800"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-xl/6 font-semibold text-white">
                        {album.name}
                      </p>
                      <p className="mt-1 truncate text-sm/5 text-neutral-400">
                        {album.artists[0].name}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            )}

            {loading ? (
              <li className="flex justify-between gap-x-6 py-5">
                <LoadingSkeleton index={1} />
              </li>
            ) : (
              albums.slice(1, 5).map((album, index) => (
                <li
                  key={album.name}
                  className="flex justify-between gap-x-6 py-4"
                >
                  <div className="flex min-w-0 gap-x-4 items-center">
                    <span className="text-sm text-neutral-400 w-4">
                      {index + 2}.
                    </span>
                    <Image
                      alt="Album Cover Image"
                      src={album.images[0].url}
                      width={48}
                      height={48}
                      className="flex-none rounded bg-neutral-800"
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
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
