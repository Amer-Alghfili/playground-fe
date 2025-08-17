import React from "react";
import { Result } from "./page";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";

export function Podcasts({ list = [] }: { list: Result[] }) {
  const [view, setView] = React.useState<"scroll" | "grid">("scroll");

  return (
    <div className="flex flex-col gap-4">
      <div className="text-white border-b border-b-gray-600 pb-4 flex items-center justify-between">
        <span>Top Podcasts</span>
        <div className="flex gap-3">
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
      {view === "scroll" ? (
        <ScrollView list={list} />
      ) : (
        <GridView list={list} />
      )}
    </div>
  );
}

function GridView({ list = [] }: { list: Result[] }) {
  return (
    <div className="grid gap-2 [grid-template-columns:repeat(6,minmax(16%,1fr))] overflow-auto transition-all">
      {list.map((it) => {
        return (
          <Podcast
            key={it.title}
            title={it.title}
            subtitle={it.subtitle}
            img={it.img600}
            className="grid-row flex flex-col gap-2"
          />
        );
      })}
    </div>
  );
}

function ScrollView({ list = [] }: { list: Result[] }) {
  return (
    <AliceCarousel
      responsive={{
        "0": {
          items: 1,
        },
        "400": {
          items: 2,
        },
        "600": {
          items: 3,
        },
        "1024": {
          items: 6,
        },
      }}
      items={list.map((it) => {
        return (
          <Podcast
            key={it.title}
            title={it.title}
            subtitle={it.subtitle}
            img={it.img600}
            className="me-2"
          />
        );
      })}
    />
  );
}

function Podcast({
  title,
  subtitle,
  img,
  className,
}: Pick<Result, "title" | "subtitle"> & { img: string; className?: string }) {
  return (
    <article key={title} className={className}>
      <img className="h-[11em] rounded-md" src={img} alt={title} />
      <div className="flex flex-col">
        <span className="text-white">{title}</span>
        <span className="text-white text-xs">{subtitle}</span>
      </div>
    </article>
  );
}
