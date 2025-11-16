import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

import courses from "../../components/student/CourseData";
import Curriculum from "../../components/student/Curriculum";
import CourseSidebar from "../../components/student/CourseSideBar";
import Rating from "../../components/student/Rating";

export default function CourseDetails() {
  const { id } = useParams();

  const course = courses.find((c) => String(c.id) === String(id));

  if (!course) {
    return (
      <div className="p-10 text-center text-xl text-gray-600">
        Course not found.
      </div>
    );
  }

  const numericRating = Number(course.rating || 0);

  const totalDuration = humanizeDuration(
    (course.totalMinutes || 0) * 60 * 1000,
    {
      largest: 2,
      round: true,
    }
  );

  return (
    <div className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-extrabold text-slate-900">
            {course.title}
          </h1>

          <p className="mt-3 text-slate-600">{course.subtitle}</p>

          <div className="flex items-center gap-3 mt-4">
            <Rating rating={numericRating} />

            <span className="text-sm font-medium text-slate-700">
              {numericRating.toFixed(1)}
            </span>

            <span className="text-xs text-slate-400">
              ({course.reviews} ratings)
            </span>

            <span className="text-xs text-slate-400">
              · {course.students} students
            </span>
          </div>

          <div className="mt-8 rounded-lg overflow-hidden shadow-md">
            <YouTube
              videoId={course.youtubeId || "dQw4w9WgXcQ"}
              opts={{
                width: "100%",
                height: "390",
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                },
              }}
            />
          </div>

          <div className="mt-10">
            <h3 className="font-semibold mb-3">Course Structure</h3>

            <div className="text-sm text-slate-500 mb-4">
              {course.totalSections} sections • {course.totalLectures} lectures
              • {totalDuration}
            </div>

            <Curriculum sections={course.curriculum} />
          </div>

          <div className="mt-10">
            <h3 className="font-semibold mb-3">Course Description</h3>
            <p className="text-slate-700 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>
        <div>
          <CourseSidebar course={course} />
        </div>
      </div>
    </div>
  );
}
