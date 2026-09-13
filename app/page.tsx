import WeightTile from "@/components/weight/WeightTile";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Daily
        </h1>

        <p className="mt-2 text-gray-500">
          Keep track of the things that matter.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <WeightTile />
        </div>
      </div>
    </main>
  );
}
