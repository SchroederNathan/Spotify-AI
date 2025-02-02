import React from "react";

export default function Card({
  header,
  body,
}: {
  header: React.ReactNode;
  body: React.ReactNode;
}) {
  return (
    <div className="divide-y divide-neutral-700 overflow-hidden rounded-lg bg-neutral-800 shadow-sm">
      <div className="px-4 py-5 sm:px-6">{header}</div>
      <div className="px-4 py-5 sm:p-6">{body}</div>
    </div>
  );
}
