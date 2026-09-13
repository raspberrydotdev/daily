import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { weightEntries } from "@/db/schema/weight";

export async function GET() {
try {
const entries = await db
.select()
.from(weightEntries)
.orderBy(desc(weightEntries.recordedAt));

return NextResponse.json(entries);


} catch (error) {
console.error("Failed to fetch weight entries:", error);

return NextResponse.json(
  { error: "Failed to fetch weight entries" },
  { status: 500 },
);


}
}

export async function POST(request: Request) {
try {
const body = await request.json();

const weightKg = Number(body.weightKg);
const date = String(body.date);

if (
  !Number.isFinite(weightKg) ||
  weightKg <= 0 ||
  weightKg > 500
) {
  return NextResponse.json(
    { error: "Invalid weight" },
    { status: 400 },
  );
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  return NextResponse.json(
    { error: "Invalid date" },
    { status: 400 },
  );
}

const now = new Date();

const recordedAt = new Date(
  `${date}T${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
);

if (Number.isNaN(recordedAt.getTime())) {
  return NextResponse.json(
    { error: "Invalid date" },
    { status: 400 },
  );
}

const [entry] = await db
  .insert(weightEntries)
  .values({
    weightKg: weightKg.toFixed(2),
    recordedAt,
  })
  .returning();

return NextResponse.json(entry, { status: 201 });


} catch (error) {
console.error("Failed to create weight entry:", error);

return NextResponse.json(
  { error: "Failed to create weight entry" },
  { status: 500 },
);


}
}