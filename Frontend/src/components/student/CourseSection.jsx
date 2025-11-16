import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import courses from "./CourseData";

export default function CourseSection() {
  return (
    <section className="py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Learn from the best
        </h2>

        <p className="text-center mb-6 text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            to={"course-list"}
            className="px-5 py-2 border rounded-md text-sm"
          >
            Show all courses
          </Link>
        </div>
      </div>
    </section>
  );
}
