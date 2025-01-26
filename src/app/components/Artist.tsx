import { useState, useEffect } from "react";
import Image from "next/image";

export default function Artist({ artist }: { artist: Artist }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (artist) {
      setIsLoading(false);
    }
  }, [artist]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:flex">
      <div className="mb-4 shrink-0 sm:mr-4 sm:mb-0">
        <Image
        className="h-32 w-32 rounded-lg"
          src={artist.coverImage.url}
          alt={artist.name}
          width={artist.coverImage.width}
          height={artist.coverImage.height}
        />
      </div>
      <div>
        <h4 className="text-lg font-bold">{artist.name}</h4>
        <p className="mt-1">
          {artist.followers} followers
        </p>
      </div>
    </div>
  );
}
