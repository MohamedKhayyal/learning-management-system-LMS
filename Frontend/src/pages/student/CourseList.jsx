import { useMemo, useState } from "react";
import CourseCard from "../../components/student/CourseCard";
import courses from "../../components/student/CourseData";

export default function CourseListPage() {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(8);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.author && c.author.toLowerCase().includes(q)) ||
        (c.badge && c.badge.toLowerCase().includes(q))
    );
  }, [query]);

  const canLoadMore = visible < filtered.length;

  function handleLoadMore() {
    setVisible((v) => Math.min(filtered.length, v + 8));
  }

  return (
    <div className="py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Course List</h1>
            <nav className="text-sm text-slate-500 mt-1">
              <span className="text-blue-600">Home</span>
              <span className="mx-2">/</span>
              <span>Course List</span>
            </nav>
          </div>

          <div className="w-full md:w-96">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white rounded-md border border-gray-200 h-11 flex items-center px-3">
                <svg
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Search for courses"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full outline-none text-sm ml-3"
                />
              </div>

              <button className="h-11 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.slice(0, visible).map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {filtered.length === 0 ? (
            <div className="text-slate-500">No courses found.</div>
          ) : canLoadMore ? (
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Load more
            </button>
          ) : (
            <div className="text-slate-500">All courses loaded.</div>
          )}
        </div>
      </div>
    </div>
  );
}
