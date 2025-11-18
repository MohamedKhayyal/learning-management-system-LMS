import { NavLink } from "react-router-dom";

const items = [
  { to: "/admin", label: "Dashboard", icon: "🏠" },
  { to: "/admin/add-course", label: "Add Course", icon: "➕" },
  { to: "/admin/my-courses", label: "My Courses", icon: "📚" },
  { to: "/admin/students", label: "Student Enrolled", icon: "👥" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white/95 border-r border-slate-200 shadow-sm flex flex-col">
      <div className="px-6 py-5 flex items-center gap-3 border-b border-slate-100">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-600 shadow-md">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="#fff" />
          </svg>
        </span>

        <div className="flex flex-col">
          <span className="font-semibold text-lg text-slate-900 leading-tight">
            Edemy
          </span>
          <span className="text-[11px] uppercase tracking-wide text-slate-400">
            Instructor Panel
          </span>
        </div>
      </div>

      <nav className="mt-4 flex-1">
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.to} className="relative">
              <NavLink
                to={it.to}
                end
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 px-5 py-2.5 text-sm transition-colors duration-150 rounded-r-2xl border-l-4",
                    isActive
                      ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={[
                        "inline-flex items-center justify-center w-8 h-8 rounded-xl text-base transition-transform duration-150",
                        isActive
                          ? "bg-blue-100"
                          : "bg-slate-100 group-hover:bg-slate-200",
                      ].join(" ")}
                    >
                      {it.icon}
                    </span>
                    <span className="truncate">{it.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-5 py-4 border-t border-slate-100 text-[11px] text-slate-400">
        <p className="leading-tight">
          Manage your courses, students and content from this dashboard.
        </p>
      </div>
    </aside>
  );
}
