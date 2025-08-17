import React from "react";
import { Result } from "./page";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";

type ViewType = "scroll" | "grid" | "list" | "compact";
export function TopEpisodes({ list = [] }: { list: Result[] }) {
  const [view, setView] = React.useState<ViewType>("compact");

  return (
    <div className="flex flex-col gap-4">
      <div className="text-white border-b border-b-gray-600 pb-4 flex items-center justify-between">
        <span>Top Podcasts</span>
        <div className="flex gap-3">
          <select
            className="bg-blue-950 rounded-lg shrink-0 py-2 px-2 text-white text-sm"
            onChange={(e) => setView(e.target.value as ViewType)}
          >
            <option value="scroll">Scroll Layout</option>
            <option value="grid">Grid Layout</option>
            <option value="list">List Layout</option>
            <option value="compact">Compact Layout</option>
          </select>
        </div>
      </div>
      {view === "scroll" ? (
        <ScrollView list={list} />
      ) : view === "grid" ? (
        <GridView list={list} />
      ) : view === "list" ? (
        <ListView list={list} />
      ) : (
        <CompactView list={list} />
      )}
    </div>
  );
}

function GridView({ list }: { list: Result[] }) {
  return (
    <div className="grid gap-2 [grid-template-columns:repeat(6,minmax(33%,1fr))] overflow-auto transition-all">
      {list.map((it) => {
        return (
          <Episode
            key={it.title}
            title={it.title}
            subtitle={it.subtitle}
            img100={it.img100}
          />
        );
      })}
    </div>
  );
}

function ScrollView({ list }: { list: Result[] }) {
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
          items: 3,
        },
      }}
      items={list.map((it) => {
        return (
          <Episode
            key={it.title}
            title={it.title}
            subtitle={it.subtitle}
            img100={it.img100}
            className="me-2 max-h-[7em]"
          />
        );
      })}
    />
  );
}

function ListView({ list }: { list: Result[] }) {
  return (
    <div className="flex flex-col gap-4">
      {list.map((it) => {
        return (
          <Episode
            key={it.title}
            title={it.title}
            subtitle={it.subtitle}
            img100={it.img100}
          />
        );
      })}
    </div>
  );
}

function CompactView({ list }: { list: Result[] }) {
  return (
    <div className="grid gap-2 [grid-template-columns:repeat(6,minmax(33%,1fr))] overflow-auto transition-all">
      {list.map((it) => {
        return (
          <article key={it.title} className="flex items-center gap-4">
            <img
              className="h-[3em] rounded-md"
              src={it.img100}
              alt={it.title}
            />
            <div className="flex flex-col">
              <span className="text-white text-sm">{it.title}</span>
              <span className="text-white text-xs">{it.subtitle}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Episode({
  title,
  subtitle,
  img100,
  className,
}: Pick<Result, "img100" | "title" | "subtitle"> & { className?: string }) {
  return (
    <article
      key={title}
      className={`bg-[rgba(0,0,0,.1)] rounded-md border border-[#2e2e38] flex items-center gap-4 ${className}`}
    >
      <img className="h-[6em] rounded-md" src={img100} alt={title} />
      <div className="flex flex-col">
        <span className="text-white text-xs">{subtitle}</span>
        <span className="text-white text-xs">{subtitle}</span>
      </div>
    </article>
  );
}
