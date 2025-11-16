import Rating from "./Rating";

export default function CourseSidebar({ course }) {
  return (
    <aside className="bg-white shadow-sm p-4 sticky top-24">
      <img
        src={course.image}
        className="w-full rounded-lg object-cover mb-4"
        alt={course.title}
      />

      <div className="text-rose-600 text-xs font-medium mb-1">
        5 days left at this price!
      </div>

      <div className="flex items-end gap-2">
        <div className="text-2xl font-bold">{course.price}</div>
        {course.oldPrice && (
          <div className="line-through text-slate-400">{course.oldPrice}</div>
        )}
        {course.discount && (
          <div className="text-xs text-slate-500">{course.discount}% off</div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Rating rating={course.rating} />
        <span className="text-sm">{course.rating}</span>
        <span className="text-xs text-slate-400">
          ({course.reviews} ratings)
        </span>
      </div>

      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
        Enroll Now
      </button>

      <ul className="mt-4 text-sm text-slate-600 space-y-2">
        <li>Lifetime access with free updates.</li>
        <li>Hands-on project guidance.</li>
        <li>Downloadable source code.</li>
        <li>Certificate of completion.</li>
      </ul>
    </aside>
  );
}
