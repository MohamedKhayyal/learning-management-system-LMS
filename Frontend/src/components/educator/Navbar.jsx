import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 h-14 flex items-center px-6">
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-600">Hi! Richard</div>

        <div className="relative">
          <button
            onClick={() => setOpen((s) => !s)}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-white"
          >
            <span className="text-slate-600">👤</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded border shadow-sm text-sm">
              <a className="block px-4 py-2 hover:bg-gray-50" href="#">
                My Profile
              </a>
              <a className="block px-4 py-2 hover:bg-gray-50" href="#">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
