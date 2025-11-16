import { NavLink } from "react-router-dom";

const items = [
  { to: "/admin", label: "Dashboard", icon: "🏠" },
  { to: "/admin/add-course", label: "Add Course", icon: "➕" },
  { to: "/admin/my-courses", label: "My Courses", icon: "📚" },
  { to: "/admin/students", label: "Student Enrolled", icon: "👥" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="px-6 py-4 flex items-center gap-3 border-b border-gray-100">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0577ff] shadow-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="#fff" />
          </svg>
        </span>

        <span className="font-semibold text-lg text-slate-800">Edemy</span>
      </div>

      <nav className="mt-6">
        <ul>
          {items.map((it) => (
            <li key={it.to} className="relative">
              <NavLink
                to={it.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 text-sm transition ${
                    isActive
                      ? "bg-white text-slate-900 font-medium"
                      : "text-slate-700 hover:bg-gray-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        isActive ? "bg-blue-600" : "hidden"
                      }`}
                    />
                    <span className="w-6 text-center">{it.icon}</span>
                    <span>{it.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
