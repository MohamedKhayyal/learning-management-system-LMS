import { useState } from "react";

export default function SignUp() {
  const [role, setRole] = useState("student");
  const [showPwd, setShowPwd] = useState(false);

  return (
    <section className="min-h-screen flex">
      <div className="hidden lg:block w-1/2">
        <img
          src="/src/assets/signIn.jpg"
          alt="Sign up visual"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Create your account
          </h2>

          <p className="text-slate-500 mb-8">
            Join our platform and start learning or teaching today.
          </p>

          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-3 rounded-md border text-sm transition ${
                role === "student"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-slate-600 hover:bg-gray-100"
              }`}
            >
              Sign up as Student
            </button>

            <button
              onClick={() => setRole("educator")}
              className={`flex-1 py-3 rounded-md border text-sm transition ${
                role === "educator"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-slate-600 hover:bg-gray-100"
              }`}
            >
              Sign up as Educator
            </button>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Full name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 h-11 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Email address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 h-11 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                className="w-full border border-gray-300 rounded-md px-4 h-11 outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-600 px-2 py-1 rounded"
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>

            <input type="hidden" name="role" value={role} />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
