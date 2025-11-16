export default function Footer() {
  return (
    <footer className="w-full bg-[#0c1117] text-white/80 pt-12 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="max-w-80">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0577ff] shadow-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="#fff" />
              </svg>
            </span>
            <span className="font-semibold text-lg text-white">Edemy</span>
          </div>

          <p className="text-sm leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold text-white mb-3">Company</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="text-lg font-semibold text-white">
            Subscribe to our newsletter
          </p>
          <p className="mt-3 text-sm leading-6">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex items-center mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-9 px-3 bg-[#0c1117] border border-gray-700 rounded-l outline-none text-sm placeholder-gray-500"
            />
            <button className="h-9 px-4 bg-[#0b79ff] hover:bg-[#096fe6] transition text-white rounded-r text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 mt-10" />

      <div className="text-center py-5 text-sm text-gray-400">
        Copyright {new Date().getFullYear()} © Edemy. All Right Reserved.
      </div>
    </footer>
  );
}
