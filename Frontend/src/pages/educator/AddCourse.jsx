import { useState } from "react";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { title, heading, description, price, file };
    alert("Course submitted (check console)");
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-5xl mx-auto px-8 py-8">
        <h1 className="text-lg font-semibold mb-6">Add Course</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Course Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 h-10"
              placeholder="Type here"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Course Headings
            </label>
            <input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 h-10"
              placeholder="Type here"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Course Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-28"
              placeholder="Type here"
            />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Course Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-32 border border-gray-300 rounded px-3 h-10"
                min="0"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-slate-700 mb-2">
                Course Thumbnail
              </label>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-600 border border-blue-100 cursor-pointer">
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
                  <span className="text-sm">Upload</span>
                </label>

                {preview ? (
                  <img
                    src={preview}
                    alt="thumb"
                    className="w-28 h-20 object-cover rounded border"
                  />
                ) : (
                  <div className="w-28 h-20 bg-gray-50 rounded border flex items-center justify-center text-xs text-gray-400">
                    Preview
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
