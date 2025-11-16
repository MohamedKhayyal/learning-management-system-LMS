import { useState } from "react";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <section className="min-h-screen flex bg-white">
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Welcome Back
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-1 text-slate-600">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 h-11 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Password
              </label>
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
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-slate-600">Remember me</span>
              </label>

              <a
                className="text-blue-600 hover:underline"
                href="/forgot-password"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition"
            >
              Sign in
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="text-xs text-slate-400">or continue with</div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <button
              onClick={() => {
                console.log("Sign in with Google (placeholder)");
                alert("Google Sign-in placeholder");
              }}
              className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
                loading="lazy"
              />
              <span className="text-sm text-slate-700">
                Sign in with Google
              </span>
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-600 text-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
