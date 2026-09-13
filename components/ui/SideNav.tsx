"use client";

import Link from "next/link";
import { useEffect } from "react";

type SideNavProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideNav({
  open,
  onClose,
}: SideNavProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-200 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <h2 className="text-xl font-semibold tracking-tight text-gray-900">
              Menu
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition hover:bg-gray-200"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="px-4 py-4">
            <Link
              href="/weight"
              onClick={onClose}
              className="flex items-center rounded-2xl px-4 py-4 text-base font-medium text-gray-900 transition hover:bg-gray-100"
            >
              Weight History
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
