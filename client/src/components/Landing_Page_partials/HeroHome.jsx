import { useRouter } from "next/router";
function HeroHome() {
  const router = useRouter();
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-300 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-48 md:pb-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold leading-tight">
              Welcome to <span className="text-white">Feta</span>
            </h1>
            <p className="mt-4 text-3xl text-white">Event Management</p>
            <p className="mt-8 text-xl font-light max-w-3xl mx-auto">
              Bringing Your Events to Life: Simplified Registration, and Easy
              Ticketing.
            </p>
            <div className="mt-10">
              <button
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
                onClick={() => router.push("/users/signup")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
