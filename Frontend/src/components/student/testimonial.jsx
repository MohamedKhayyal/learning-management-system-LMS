const testimonials = [
  {
    id: 1,
    name: "Donald Jackman",
    role: "SWE 1 @ Amazon",
    avatar: "/src/assets/profile_img.png",
    rating: 5,
    text: "I've been using imaglify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    id: 2,
    name: "Richard Nelson",
    role: "SWE 2 @ Samsung",
    avatar: "/src/assets/profile_img2.png",
    rating: 5,
    text: "I've been using imaglify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    id: 3,
    name: "James Washington",
    role: "SWE 2 @ Google",
    avatar: "/src/assets/profile_img3.png",
    rating: 5,
    text: "I've been using imaglify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
];

export default function Testimonial() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">Testimonials</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
          Hear from our learners as they share their journeys of transformation,
          success, and how our platform has made a difference in their lives.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ avatar, name, role, rating, text }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-t-lg">
        <img
          src={avatar}
          alt={name}
          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow"
        />
        <div>
          <div className="text-sm font-semibold text-slate-800">{name}</div>
          <div className="text-xs text-slate-400">{role}</div>
        </div>
      </div>

      <div className="px-5 py-6">
        <div className="flex items-center mb-3">
          <Stars count={rating} />
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">{text}</p>

        <a
          className="inline-block mt-4 text-sm text-sky-600 hover:underline"
          href="#"
        >
          Read more
        </a>
      </div>
    </div>
  );
}

function Stars({ count = 5 }) {
  const stars = Array.from({ length: 5 }).map((_, i) => i < count);
  return (
    <div className="flex items-center gap-1">
      {stars.map((filled, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${filled ? "text-amber-400" : "text-gray-200"}`}
          viewBox="0 0 20 20"
          fill={filled ? "currentColor" : "none"}
          stroke={filled ? "none" : "#E5E7EB"}
          aria-hidden
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.839-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"
            fill={filled ? "currentColor" : "#F1F5F9"}
          />
        </svg>
      ))}
    </div>
  );
}
