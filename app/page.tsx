"use client";

import axios from "axios";
import React from "react";
import useDebounce from "react-debounced";
import Link from "next/link";
import { Podcasts } from "@/components/Podcasts";
import { TopEpisodes } from "@/components/TopEpisodes";
import { Logo } from "../components/Logo";

export type Result = {
  title: string;
  subtitle: string;
  img30: string;
  img60: string;
  img100: string;
  img600: string;
  img160?: string;
};

export default function Home() {
  const [list, setList] = React.useState<{
    podcasts: Result[];
    topEpisodes: Result[];
  }>({ podcasts: [], topEpisodes: [] });

  return (
    <>
      <div className="md:hidden">
        <header className="flex items-center gap-12 p-4">
          <Search onSearch={setList} />
        </header>
        <div className="flex flex-col gap-6 px-6 py-6">
          <Podcasts list={list.podcasts} />
          <TopEpisodes list={list.topEpisodes} />
        </div>
      </div>
      <div className="hidden md:flex gap-0">
        <nav className="h-screen bg-[rgba(0,0,0,.1)] border-e border-e-[#2e2e38] min-w-[15em] px-6 py-6">
          <div className="mb-7">
            <Logo />
          </div>
          <ul className="text-white flex flex-col gap-2">
            <li className="text-blue-400">Home</li>
            <li>Discover</li>
            <li>
              <Link href="/about" className="hover:text-blue-400">
                About Us
              </Link>
            </li>
          </ul>
        </nav>
        <main className="w-full p-4 flex flex-col gap-12 overflow-hidden">
          <header className="flex gap-2 items-center">
            <Search onSearch={setList} />
            <button className="bg-blue-950 rounded-lg shrink-0 py-2 px-2 text-white text-sm">
              Log in
            </button>
            <button className="bg-blue-950 rounded-lg shrink-0 py-2 px-2 text-white text-sm">
              Sign up
            </button>
          </header>
          <div className="flex flex-col gap-6">
            <Podcasts list={list.podcasts} />
            <TopEpisodes list={list.topEpisodes} />
          </div>
        </main>
      </div>
    </>
  );
}

function Search({
  onSearch,
}: {
  onSearch: (result: { podcasts: Result[]; topEpisodes: Result[] }) => void;
}) {
  const debounce = useDebounce(500);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    debounce(async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api?search=${value}`
        );

        onSearch({
          podcasts: (data.podcasts as Result[]).map((it) => {
            return {
              title: it.title,
              subtitle: it.subtitle,
              img30: it.img30,
              img60: it.img60,
              img100: it.img100,
              img600: it.img600,
            };
          }),
          topEpisodes: (data.topEpisodes as Result[]).map((it) => {
            return {
              title: it.title,
              subtitle: it.subtitle,
              img30: it.img30,
              img60: it.img60,
              img100: it.img100,
              img600: it.img600,
              img160: it.img160,
            };
          }),
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  return (
    <input
      className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-center text-white w-full py-1 px-2"
      placeholder="Search..."
      onChange={onChange}
    />
  );
}
