import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full bg-[#e9fbff] border-b border-[#d6eef6]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-20">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
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
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-6 text-sm text-slate-700">
              <Link to="/" className="hover:underline">
                Become Educator
              </Link>
              <span className="text-slate-300">|</span>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </div>

            <div className="ml-2">
              <Link
                to="/signup"
                className="inline-block px-5 py-2 rounded-full bg-[#0b79ff] hover:bg-[#096fe6] text-white text-sm font-medium transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
