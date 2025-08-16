import React from "react";
import { Result } from "./page";
import { usePathname, useRouter } from "next/navigation";

export function TopEpisodes({ list }: { list: Result[] }) {
  const [view, setView] = React.useState<"scroll" | "grid">("scroll");
  const [indexes, setIndexes] = React.useState<number[]>([5]);

  const router = useRouter();
  const pathname = usePathname();

  function scrollToNext() {
    if (view === "grid") return;

    const lastIndex = indexes[indexes.length - 1];
    if (lastIndex === list.length - 1) return;

    const nextIndex = lastIndex + 6;
    if (list.length <= nextIndex) {
      setIndexes([...indexes, list.length - 1]);
    } else {
      setIndexes([...indexes, nextIndex]);
    }
  }
  function scrollToPrev() {
    if (view === "grid") return;
    const newIndexes = [...indexes];
    newIndexes.pop();

    setIndexes(newIndexes);
  }

  React.useEffect(
    function scroll() {
      const lastIndex = indexes[indexes.length - 1];
      router.push(`${pathname}#${lastIndex}`);
    },
    [indexes]
  );

  const gridContainer =
    view === "scroll"
      ? "auto-cols-[33%]"
      : "[grid-template-columns:repeat(6,minmax(16%,1fr))]";
  const gridItemRow = view === "scroll" ? "row-start-1 row-end-1" : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-white border-b border-b-gray-600 pb-4 flex items-center justify-between">
        <span>Top Episodes</span>
        <div className="flex gap-3">
          <div className="flex gap-2">
            <button onClick={scrollToPrev}>
              <PreviousIcon />
            </button>
            <button onClick={scrollToNext}>
              <NextIcon />
            </button>
          </div>
          <button
            className="bg-blue-950 rounded-lg shrink-0 py-2 px-2 text-white text-sm"
            onClick={() =>
              setView((prev) => (prev === "grid" ? "scroll" : "grid"))
            }
          >
            Switch layout to {view === "grid" ? "scroll" : "grid"}
          </button>
        </div>
      </div>
      <div
        className={`grid gap-2 ${gridContainer} overflow-auto transition-all`}
      >
        {list.map((it, index) => {
          return (
            <article
              key={it.title}
              id={
                list.length - 1 === index || (index + 1) % 6 === 0
                  ? index.toString()
                  : undefined
              }
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

function PreviousIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      height="1.2em"
      width="1.2em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
    </svg>
  );
}

function NextIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      height="1.2em"
      width="1.2em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
    </svg>
  );
}
