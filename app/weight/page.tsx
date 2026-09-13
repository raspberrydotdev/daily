"use client";

import Link from "next/link";

import WeightHistory from "@/components/weight/WeightHistory";

export default function WeightPage() {
return (
<main className="min-h-screen bg-gray-50 px-5 py-6">
<header className="mb-8 flex items-center gap-3">
<Link href="/" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-gray-700 shadow-sm transition hover:bg-gray-100" aria-label="Back to Daily" >
←
</Link>

    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
      Weight History
    </h1>
  </header>

  <WeightHistory />
</main>


);
}