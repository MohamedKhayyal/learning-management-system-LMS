export default function CallToAction() {
  return (
    <section className="py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-semibold text-slate-900">
          Learn anything, anytime, anywhere
        </h2>

        <p className="mt-3 text-sm md:text-base text-slate-500 leading-relaxed">
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim
          id veniam aliqua proident excepteur commodo do ea.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition">
            Get started
          </button>

          <button className="flex items-center gap-1 text-sm text-slate-700 hover:text-slate-900 transition">
            Learn more
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
