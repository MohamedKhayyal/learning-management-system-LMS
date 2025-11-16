import { useState } from "react";
import humanizeDuration from "humanize-duration";

export default function Curriculum({ sections }) {
  const safeSections = Array.isArray(sections) ? sections : [];

  const [openIds, setOpenIds] = useState(() =>
    safeSections.length ? [safeSections[0].id] : []
  );

  const toggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (!safeSections.length) {
    return (
      <div className="px-5 py-4 text-sm text-slate-500">
        No curriculum available yet.
      </div>
    );
  }

  return (
    <div>
      {safeSections.map((sec, index) => {
        const isOpen = openIds.includes(sec.id);
        const sectionMinutes = (sec.items || []).reduce(
          (sum, it) => sum + (it.minutes || 0),
          0
        );

        const durationLabel = humanizeDuration(sectionMinutes * 60 * 1000, {
          largest: 1,
          round: true,
        });

        return (
          <div
            key={sec.id}
            className={`border-t border-slate-200 ${index === 0 ? "" : ""}`}
          >
            <button
              type="button"
              onClick={() => toggle(sec.id)}
              className="w-full flex items-center justify-between px-5 py-3 bg-slate-50 hover:bg-slate-100 transition text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">
                  {isOpen ? "▼" : "▶"}
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {sec.title}
                </span>
              </div>

              <div className="text-xs text-slate-500">
                {(sec.meta?.lectures ?? (sec.items || []).length) || 0} lectures
                · {durationLabel}
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-3">
                <ul className="divide-y divide-slate-200">
                  {(sec.items || []).map((it) => (
                    <li
                      key={it.id}
                      className="flex items-center justify-between py-2 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-slate-300 text-[10px] text-slate-500">
                          ●
                        </span>
                        <span className="text-slate-800">{it.title}</span>
                      </div>
                      <span className="text-xs text-slate-500 min-w-[60px] text-right">
                        {it.minutes ?? "—"} mins
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
