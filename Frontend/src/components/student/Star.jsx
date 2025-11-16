import { useMemo } from "react";

export default function Star({ type = "full" }) {
  const STAR_PATH =
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.839-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z";

  const gradientId = useMemo(
    () => "half-star-" + Math.random().toString(36).slice(2),
    []
  );

  if (type === "full") {
    return (
      <svg
        className="w-4 h-4 text-amber-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path d={STAR_PATH} />
      </svg>
    );
  }

  if (type === "half") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 20 20" aria-hidden>
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#E5E7EB" />
          </linearGradient>
        </defs>

        <path d={STAR_PATH} fill={`url(#${gradientId})`} />
      </svg>
    );
  }

  return (
    <svg
      className="w-4 h-4 text-gray-300"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path d={STAR_PATH} />
    </svg>
  );
}
