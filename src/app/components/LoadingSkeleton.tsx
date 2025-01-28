import React from "react";

const LoadingSkeleton = ({ index }: { index: number }) => {
  return (
      <div className="flex min-w-0 gap-x-4 items-center">
        <span className="text-sm text-neutral-400 w-4">{index}.</span>
        <div className="size-12 flex-none rounded bg-neutral-700 animate-pulse" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-white w-12 h-2 rounded-sm bg-neutral-700 animate-pulse"></p>
          <p className="mt-3 truncate text-xs/5 text-neutral-400 h-2 w-32 rounded-sm bg-neutral-700 animate-pulse"></p>
        </div>
      </div>

  );
};

export default LoadingSkeleton;
