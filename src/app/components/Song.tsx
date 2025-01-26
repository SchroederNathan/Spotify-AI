import { useState, useEffect } from "react";
import Image from "next/image";

export default function Song({ track }: { track: Track }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (track) {
      setIsLoading(false);
    }
  }, [track]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:flex">
      <div className="mb-4 shrink-0 sm:mr-4 sm:mb-0">
        <Image
        className="h-32 w-32 rounded-lg"
          src={track.coverImage.url}
          alt={track.title}
          width={track.coverImage.width}
          height={track.coverImage.height}
        />
      </div>
      <div>
        <h4 className="text-lg font-bold">{track.title}</h4>
        <p className="mt-1">
          {track.artist}
        </p>
      </div>
    </div>
  );
}
