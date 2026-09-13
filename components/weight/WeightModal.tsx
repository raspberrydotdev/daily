"use client";

import { useRef, useState } from "react";

type WeightModalProps = {
open: boolean;
onClose: () => void;
onSaved: () => void;
};

function getToday() {
const now = new Date();

return [
now.getFullYear(),
String(now.getMonth() + 1).padStart(2, "0"),
String(now.getDate()).padStart(2, "0"),
].join("-");
}

function formatDate(date: string) {
return new Intl.DateTimeFormat("en-IN", {
weekday: "short",
day: "numeric",
month: "short",
}).format(new Date(`${date}T00:00:00`));}

export default function WeightModal({
open,
onClose,
onSaved,
}: WeightModalProps) {
const [weight, setWeight] = useState("");
const [selectedDate, setSelectedDate] = useState(getToday);
const [saving, setSaving] = useState(false);
const [error, setError] = useState("");

const dateInputRef = useRef<HTMLInputElement>(null);

if (!open) {
return null;
}

function addNumber(value: string) {
if (value === "." && weight.includes(".")) {
return;
}

if (value === "." && weight === "") {
  setWeight("0.");
  return;
}

const decimalIndex = weight.indexOf(".");

if (
  decimalIndex !== -1 &&
  weight.length - decimalIndex > 2
) {
  return;
}

if (weight.replace(".", "").length >= 5) {
  return;
}

setWeight((current) => current + value);


}

function removeNumber() {
setWeight((current) => current.slice(0, -1));
}

function openDatePicker() {
const input = dateInputRef.current;

if (!input) {
  return;
}

input.showPicker?.();

if (!input.showPicker) {
  input.click();
}


}

async function handleSubmit() {
if (!weight || Number(weight) <= 0) {
setError("Enter your weight.");
return;
}

setError("");
setSaving(true);

try {
  const response = await fetch("/api/weight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weightKg: Number(weight),
      date: selectedDate,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save weight");
  }

  setWeight("");
  setSelectedDate(getToday());

  onSaved();
} catch {
  setError("Unable to save weight. Please try again.");
} finally {
  setSaving(false);
}


}

return (
<div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4" onMouseDown={onClose} >
<div
className="w-full max-w-md rounded-t-[2rem] bg-white px-6 pb-8 pt-6 shadow-xl sm:rounded-[2rem]"
onMouseDown={(event) => event.stopPropagation()}
>
<div className="mb-4 flex items-center justify-between">
<h2 className="text-xl font-semibold text-gray-900">
Log weight
</h2>

      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer text-2xl leading-none text-gray-400"
        aria-label="Close"
      >
        ×
      </button>
    </div>

    <div className="flex flex-col items-center">
      <div className="flex items-baseline">
        <span className="text-6xl font-semibold tracking-tight text-gray-900">
          {weight || "0"}
        </span>

        <span className="ml-2 text-xl text-gray-400">
          kg
        </span>
      </div>

      <button
        type="button"
        onClick={openDatePicker}
        className="mt-3 cursor-pointer text-sm font-medium text-gray-500 transition hover:text-gray-900"
      >
        {formatDate(selectedDate)} · tap to change
      </button>

      <input
        ref={dateInputRef}
        type="date"
        value={selectedDate}
        onChange={(event) => setSelectedDate(event.target.value)}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>

    {error && (
      <p className="mt-3 text-center text-sm text-red-600">
        {error}
      </p>
    )}

    <div className="mx-auto mt-6 grid max-w-xs grid-cols-3 gap-3">
      {[
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ].map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => addNumber(number)}
          className="flex h-16 cursor-pointer items-center justify-center rounded-2xl bg-gray-100 text-2xl font-medium text-gray-900 transition active:scale-95 active:bg-gray-200"
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        onClick={() => addNumber(".")}
        className="flex h-16 cursor-pointer items-center justify-center rounded-2xl bg-gray-100 text-2xl font-medium text-gray-900 transition active:scale-95 active:bg-gray-200"
      >
        .
      </button>

      <button
        type="button"
        onClick={() => addNumber("0")}
        className="flex h-16 cursor-pointer items-center justify-center rounded-2xl bg-gray-100 text-2xl font-medium text-gray-900 transition active:scale-95 active:bg-gray-200"
      >
        0
      </button>

      <button
        type="button"
        onClick={removeNumber}
        className="flex h-16 cursor-pointer items-center justify-center rounded-2xl bg-gray-100 text-xl text-gray-600 transition active:scale-95 active:bg-gray-200"
        aria-label="Delete"
      >
        ⌫
      </button>
    </div>

    <button
      type="button"
      onClick={handleSubmit}
      disabled={saving}
      className="mx-auto mt-5 block w-full max-w-xs cursor-pointer rounded-2xl bg-black py-4 text-lg font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {saving ? "Saving..." : "Save weight"}
    </button>
  </div>
</div>


);
}