import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { user, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <header className="w-full bg-[#e9fbff] border-b border-[#d6eef6]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-20">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0577ff] shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="#fff" />
              </svg>
            </span>
            <span className="font-semibold text-lg text-slate-800">Edemy</span>
          </Link>

          <div className="flex items-center gap-6">
            {!user && (
              <>
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
              </>
            )}

            {user && (
              <div className="relative" ref={menuRef}>
                <img
                  src={user.photo || "/default-avatar.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer border border-slate-300 object-cover"
                  onClick={() => setOpenMenu((prev) => !prev)}
                />

                {openMenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-100 z-50">
                    <div className="px-4 py-2 text-sm text-slate-700 border-b">
                      Hi, <span className="font-medium">{user.fullName}</span>
                    </div>

                    {(user.role === "educator" || user.role === "admin") && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 text-slate-700"
                        onClick={() => setOpenMenu(false)}
                      >
                        Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
