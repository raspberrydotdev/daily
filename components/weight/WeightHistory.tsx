"use client";

import { useEffect, useState } from "react";

type WeightEntry = {
  id: number;
  weightKg: string;
  recordedAt: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function WeightHistory() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await fetch("/api/weight");

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();

        setEntries(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) {
    return (
      <p className="text-sm text-gray-400">
        Loading...
      </p>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white px-5 py-8 text-center">
        <p className="text-sm text-gray-400">
          No weight entries yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className={`flex items-center justify-between px-5 py-4 ${
            index !== entries.length - 1
              ? "border-b border-gray-100"
              : ""
          }`}
        >
          <span className="text-sm text-gray-500">
            {formatDate(entry.recordedAt)}
          </span>

          <span className="font-semibold text-gray-900">
            {entry.weightKg} kg
          </span>
        </div>
      ))}
    </div>
  );
}
