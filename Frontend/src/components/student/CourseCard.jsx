import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function CourseCard({
  id,
  image = "/src/assets/course-placeholder.jpg",
  title = "Course title",
  author = "Instructor name",
  rating = 4.5,
  reviews = 122,
  price = "$19.99",
  badge = null,
}) {
  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <article className="w-full max-w-xs bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-3">
      <Link to={`/courses/${id ?? ""}`} className="block">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover"
            loading="lazy"
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {badge}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-col justify-between min-h-[96px]">
          <div>
            <h3 className="text-sm md:text-base font-semibold text-slate-800 line-clamp-2">
              {title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{author}</p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 leading-none">
              <div className="flex items-center h-4">
                <Rating rating={rating} />
              </div>

              <span className="text-xs text-slate-600 leading-none">
                {roundedRating.toFixed(1)}
              </span>

              <span className="text-xs text-slate-400 leading-none">
                ({reviews})
              </span>
            </div>

            <div className="text-sm font-semibold text-slate-800">{price}</div>
          </div>
        </div>
      </Link>
    </article>
  );
}
