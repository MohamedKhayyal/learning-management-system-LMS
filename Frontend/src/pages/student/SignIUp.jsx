import { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
  const [role, setRole] = useState("student");
  const [showPwd, setShowPwd] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null); // ✅ preview

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Clean up preview URL لما الصورة تتغير
  useEffect(() => {
    if (!photo) {
      setPhotoPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(photo);
    setPhotoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      if (photo) {
        formData.append("photo", photo);
      }

      const res = await fetch("http://127.0.0.1:3001/api/auth/signup", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Something went wrong while signing up.");
        return;
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Create your account
          </h2>

          <p className="text-slate-500 mb-6">
            Join our platform and start learning or teaching today.
          </p>

          {/* اختيار Role */}
          <div className="mb-6 flex gap-4">
            <button
              type="button"
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
              type="button"
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

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-3">
              <label
                htmlFor="photo"
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 hover:border-blue-400 transition">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Selected profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-slate-400 text-center px-2">
                      Upload
                      <br />
                      photo
                    </span>
                  )}
                </div>
                <span className="mt-2 text-xs text-blue-600 hover:underline">
                  Click to choose profile photo
                </span>
              </label>

              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setPhoto(file || null);
                }}
                className="hidden"
              />

              {photo && (
                <p className="text-xs text-slate-500">
                  Selected: <span className="font-medium">{photo.name}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Full name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 h-11 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <input type="hidden" name="role" value={role} />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
