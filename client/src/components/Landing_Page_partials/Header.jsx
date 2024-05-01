import { useRouter } from "next/router";
import Image from "next/image";

function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div
            className="flex justify-start lg:w-0 lg:flex-1"
            onClick={() => router.push("/")}
          >
            <Image
              src="/favicon_io/favicon.ico"
              alt="Logo"
              width={60}
              height={30}
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
          <nav className="hidden md:flex space-x-10">
            <button
              className="text-gray-700 bg-white hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300"
              onClick={() => router.push("/users/signin")}
            >
              Sign In
            </button>

            <button
              className="text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition duration-300"
              onClick={() => router.push("/admin/auth")}
            >
              Event Manager
            </button>
          </nav>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => console.log("open menu")}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
