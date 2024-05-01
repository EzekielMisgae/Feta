import { useRouter } from "next/router";
import React from "react";
import { FaCheck } from "react-icons/fa";

function EventTicketsShowcase() {
  const router = useRouter();

  const tickets = [
    {
      title: "Global Tech Conference 2024",
      description:
        "Dive into the latest in technology and innovation with leaders from around the globe.",
      imageUrl:
        "https://storage.googleapis.com/techsauce-prod/ugc/uploads/2024/4/1713844557_1692263684_S__13025327_0_%282%29.jpg",
      points: [
        "Expert Speaker Panels",
        "Innovative Technology Booths",
        "Networking Opportunities",
      ],
      extraInfo: "Join us for a transformative experience this August.",
    },
    {
      title: "Live Concert Series: Jazz Nights",
      description:
        "Experience the magic of live jazz with celebrated artists in an unforgettable setting.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEm2nLtjl9zeIUIZDbDBRl5J717wmW7qlyK3M7JXHxLOvm27GURTSVYWB8NHBOv188AM&usqp=CAU",
      points: [
        "Exclusive Artist Lineup",
        "Gourmet Food & Drinks",
        "Ideal for Date Nights",
      ],
      extraInfo: "Tickets are limited, secure your spot now!",
    },
    // Add more tickets as needed
  ];

  const columnSpanPattern = [6, 6, 4, 4, 4, 6, 6, 4]; // Defines "2323" pattern
  const getColumnSpan = (index) =>
    `md:col-span-${columnSpanPattern[index % columnSpanPattern.length]}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center pb-12 md:pb-16">
        <h1 className="text-4xl font-bold mb-4">
          catagories that you can experiance in our website
        </h1>
        <p className="text-xl text-gray-500">
          Discover unique events and secure your tickets with ease. Enhance your
          lifestyle and create memorable moments.
        </p>
      </div>
      <div className="grid md:grid-cols-12 gap-6 p-6 bg-gray-50 border-4 border-gray-300 rounded-lg shadow-lg">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className={`bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out ${getColumnSpan(
              index
            )}`}
          >
            <img
              src={ticket.imageUrl}
              alt="Event"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl text-blue-600 font-bold">
                {ticket.title}
              </h3>
              <p className="text-lg text-gray-700 mb-4">{ticket.description}</p>
              <ul className="list-none mb-3">
                {ticket.points.map((point, idx) => (
                  <li key={idx} className="flex items-center text-gray-500">
                    <FaCheck className="w-5 h-5 text-green-500 mr-2" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mb-4">{ticket.extraInfo}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => router.push("/users/signup")}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EventTicketsShowcase;
