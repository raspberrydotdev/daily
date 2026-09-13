"use client";

import { useState } from "react";

import SideNav from "@/components/ui/SideNav";
import WeightTile from "@/components/weight/WeightTile";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-5 py-6">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Daily
          </h1>

          <button
            type="button"
            onClick={() => setNavOpen(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-200"
            aria-label="Open menu"
          >
            <span className="text-2xl leading-none">☰</span>
          </button>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <WeightTile />
        </div>
      </main>

      <SideNav
        open={navOpen}
        onClose={() => setNavOpen(false)}
      />
    </>
  );
}
