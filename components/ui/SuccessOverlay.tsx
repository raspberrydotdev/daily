"use client";

import { useEffect, useState } from "react";

type SuccessOverlayProps = {
  message: string;
  onComplete: () => void;
};

export default function SuccessOverlay({
  message,
  onComplete,
}: SuccessOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger the entrance animation after mounting.
    const enterFrame = requestAnimationFrame(() => {
      setVisible(true);
    });

    // Start the exit animation.
    const exitTimer = setTimeout(() => {
      setVisible(false);
    }, 650);

    // Remove the overlay after the exit animation.
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 900);

    return () => {
      cancelAnimationFrame(enterFrame);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-400 ease-out ${
        visible
          ? "bg-black/10 opacity-100 backdrop-blur-md"
          : "bg-black/0 opacity-0 backdrop-blur-0"
      }`}
    >
      <div
        className={`flex flex-col items-center transition-all duration-400 ease-out ${
          visible
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0"
        }`}
      >
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-4xl font-medium text-white shadow-xl transition-transform duration-500 ${
            visible ? "scale-100" : "scale-50"
          }`}
        >
          ✓
        </div>

        <p className="mt-5 text-xl font-semibold text-gray-900">
          {message}
        </p>
      </div>
    </div>
  );
}
