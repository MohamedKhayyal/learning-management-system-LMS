import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function fetchCourses() {
    try {
      const res = await axios.get("http://127.0.0.1:3001/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const myCourses = res.data.data.courses.filter(
        (c) => c.author === user.fullName
      );

      setCourses(myCourses);
    } catch (err) {
      console.error("Failed to load courses:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function deleteCourse(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await axios.delete(`http://127.0.0.1:3001/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete course:", err);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-slate-900">My Courses</h1>

      {loading ? (
        <div className="text-center text-slate-500 py-10 animate-pulse">
          Loading courses...
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center text-slate-500 py-10">
          You haven't created any courses yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl border border-slate-200 shadow hover:shadow-lg transition-all overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={`http://127.0.0.1:3001${course.image}`}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition"></div>
                <Link
                  to={`/admin/edit-course/${course._id}/${course.slug}`}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-xs px-2 py-1 rounded shadow-sm border border-slate-200 transition"
                >
                  Edit
                </Link>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {course.students ?? 0} students • {course.reviews ?? 0}{" "}
                  reviews
                </p>

                <div className="mt-3 flex justify-between items-end">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-600">
                        ${course.price}
                      </span>

                      {course.oldPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ${course.oldPrice}
                        </span>
                      )}
                    </div>

                    {course.discount > 0 && (
                      <span className="mt-1 inline-flex items-center px-2 py-[2px] rounded-full bg-green-50 text-[10px] font-medium text-green-700 border border-green-100">
                        {course.discount}% OFF
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => deleteCourse(course._id)}
                    disabled={deletingId === course._id}
                    className={`text-xs px-3 py-1 rounded border ${
                      deletingId === course._id
                        ? "bg-red-200 text-red-700 cursor-not-allowed"
                        : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                    } transition`}
                  >
                    {deletingId === course._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
