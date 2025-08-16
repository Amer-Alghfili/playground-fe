import React from "react";
import { Result } from "./page";

export function Podcasts({ list }: { list: Result[] }) {
  const [view, setView] = React.useState<"scroll" | "grid">("scroll");

  const gridContainer =
    view === "scroll"
      ? "auto-cols-[16%]"
      : "[grid-template-columns:repeat(6,minmax(16%,1fr))]";
  const gridItemRow = view === "scroll" ? "row-start-1 row-end-1" : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-white border-b border-b-gray-600 pb-4 flex items-center justify-between">
        <span>Top Podcasts</span>
        <button
          className="bg-blue-950 rounded-lg shrink-0 py-2 px-2 text-white text-sm"
          onClick={() =>
            setView((prev) => (prev === "grid" ? "scroll" : "grid"))
          }
        >
          Switch layout to {view === "grid" ? "scroll" : "grid"}
        </button>
      </div>
      <div className={`grid gap-2 ${gridContainer} overflow-auto`}>
        {list.map((it) => {
          return (
            <article
              key={it.title}
              className={`max-h-[24em] grid-row ${gridItemRow}`}
            >
              <img className="w-full h-full" src={it.img60} alt={it.title} />
            </article>
          );
        })}
      </div>
    </div>
  );
}
