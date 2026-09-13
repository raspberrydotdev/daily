"use client";

import { useCallback, useState } from "react";

import SuccessOverlay from "@/components/ui/SuccessOverlay";
import WeightModal from "./WeightModal";

export default function WeightTile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaved = useCallback(() => {
    setModalOpen(false);
    setShowSuccess(true);
  }, []);

  const handleSuccessComplete = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group flex min-h-40 w-full cursor-pointer flex-col items-start justify-between rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md active:scale-[0.99]"
      >
        <span className="text-xl font-semibold tracking-tight text-gray-900">
          Weight
        </span>

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl font-light text-gray-600 transition group-hover:bg-gray-200">
          +
        </span>
      </button>

      <WeightModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
      />

      {showSuccess && (
        <SuccessOverlay
          message="Weight saved"
          onComplete={handleSuccessComplete}
        />
      )}
    </>
  );
}
