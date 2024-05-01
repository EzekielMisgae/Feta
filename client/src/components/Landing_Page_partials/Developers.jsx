import Image from "next/image";
import { FaGithub, FaLinkedin, FaLink } from "react-icons/fa";

function TeamSection({ images: developers }) {
  return (
    <div className="bg-gray-900 text-white relative min-h-screen">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold mb-10">
          Meet Our <span className="text-blue-500">Team</span>
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {developers?.slice(0, 3).map((developer) => (
            <div
              key={developer?.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              {/* Adjust image size here */}
              <Image
                className="w-full object-cover"
                src={developer?.src}
                alt={developer?.title}
                width={400} // Smaller width
                height={250} // Smaller height, adjust the ratio as needed
                layout="responsive"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{developer?.title}</h3>
                <p className="text-sm text-gray-400">{developer?.role}</p>
                {/* Additional Text Section */}
                <p className="mt-3 text-xs text-gray-300">
                  {developer?.description ||
                    "No additional information provided."}
                </p>
                <div className="mt-5 flex space-x-3">
                  {developer?.githubUrl && (
                    <a
                      href={developer?.githubUrl}
                      className="text-gray-400 hover:text-blue-500 transition duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="h-6 w-6" />
                    </a>
                  )}
                  {developer?.linkedinUrl && (
                    <a
                      href={developer?.linkedinUrl}
                      className="text-gray-400 hover:text-blue-500 transition duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                  )}
                  {developer?.websiteUrl && (
                    <a
                      href={developer?.websiteUrl}
                      className="text-gray-400 hover:text-blue-500 transition duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLink className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br/><br/><br/>
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 py-3">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-sm sm:text-base">
            Discover the brilliant minds behind our innovations. Our team of
            experts is dedicated to pushing the boundaries of technology.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeamSection;