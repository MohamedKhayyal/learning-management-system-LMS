import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [badge, setBadge] = useState("Full Stack");
  const [youtubeId, setYoutubeId] = useState("");

  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [students, setStudents] = useState("");

  const [totalSections, setTotalSections] = useState("");
  const [totalLectures, setTotalLectures] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loadingCourse, setLoadingCourse] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoadingCourse(true);
        const res = await axios.get(`http://127.0.0.1:3001/api/courses/${id}`);

        const course = res.data.data.course;

        setTitle(course.title || "");
        setSubtitle(course.subtitle || "");
        setDescription(course.description || "");
        setPrice(course.price != null ? course.price : "");
        setDiscount(course.discount != null ? course.discount : "");
        setBadge(course.badge || "Full Stack");
        setYoutubeId(course.youtubeId || "");

        setRating(course.rating != null ? course.rating : "");
        setReviews(course.reviews != null ? course.reviews : "");
        setStudents(course.students != null ? course.students : "");

        setTotalSections(
          course.totalSections != null ? course.totalSections : ""
        );
        setTotalLectures(
          course.totalLectures != null ? course.totalLectures : ""
        );
        setTotalMinutes(course.totalMinutes != null ? course.totalMinutes : "");

        if (course.image) {
          setPreview(`http://127.0.0.1:3001${course.image}`);
        }
      } catch (err) {
        console.error("Failed to load course", err);
        setError("Failed to load course details.");
      } finally {
        setLoadingCourse(false);
      }
    }

    loadCourse();
  }, [id]);

  useEffect(() => {
    if (!imageFile) return;

    const url = URL.createObjectURL(imageFile);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!title || !description || !price) {
      setError("Title, description and price are required.");
      return;
    }

    if (discount && (discount < 0 || discount > 100)) {
      setError("Discount must be between 0 and 100.");
      return;
    }

    if (!token) {
      setError("You must be logged in to edit a course.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("price", price);

    if (discount !== "") formData.append("discount", discount);
    if (badge) formData.append("badge", badge);
    if (youtubeId) formData.append("youtubeId", youtubeId);

    if (rating !== "") formData.append("rating", rating);
    if (reviews !== "") formData.append("reviews", reviews);
    if (students !== "") formData.append("students", students);

    if (totalSections !== "") formData.append("totalSections", totalSections);
    if (totalLectures !== "") formData.append("totalLectures", totalLectures);
    if (totalMinutes !== "") formData.append("totalMinutes", totalMinutes);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setSubmitting(true);

      await axios.patch(`http://127.0.0.1:3001/api/courses/${id}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/my-courses");
    } catch (err) {
      console.error("Failed to update course:", err);
      const msg =
        err.response?.data?.message || "Failed to update course. Try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingCourse) {
    return (
      <div className="flex-1 bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Edit Course</h1>
          <p className="text-sm text-slate-500 mt-1">
            Update course information, pricing, and thumbnail.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8">
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Basic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Course Title *
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3.5 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/60"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Subtitle
                  </label>
                  <input
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3.5 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 h-28 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    required
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Pricing & Category
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Price (USD) *
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-slate-500">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Badge / Category
                  </label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Media & Meta
              </h2>

              <div className="grid md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Course Thumbnail
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 cursor-pointer text-sm font-medium hover:bg-blue-100">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFile}
                      />
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l4 4h-3v6h-2V6H8l4-4zM4 10v10h16V10H4z" />
                      </svg>
                      <span>Change</span>
                    </label>

                    {preview ? (
                      <img
                        src={preview}
                        alt="Course thumbnail"
                        className="w-32 h-24 object-cover rounded-lg border border-slate-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-32 h-24 bg-slate-50 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-[11px] text-slate-400">
                        No image
                      </div>
                    )}
                  </div>
                  {imageFile && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      Selected:{" "}
                      <span className="font-medium">{imageFile.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    YouTube Video ID
                  </label>
                  <input
                    value={youtubeId}
                    onChange={(e) => setYoutubeId(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Only the video ID, not the full URL.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Reviews
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={reviews}
                    onChange={(e) => setReviews(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Students
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Total Minutes
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={totalMinutes}
                    onChange={(e) => setTotalMinutes(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Total Sections
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={totalSections}
                    onChange={(e) => setTotalSections(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Total Lectures
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={totalLectures}
                    onChange={(e) => setTotalLectures(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </section>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                className="px-5 py-2.5 rounded-full text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-50"
                onClick={() => navigate("/admin/my-courses")}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2.5 rounded-full text-sm font-medium shadow-sm ${
                  submitting
                    ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
