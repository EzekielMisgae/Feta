import React from "react";
import { FaCheck } from "react-icons/fa";

function EventTicketsShowcase() {
  // Sample data for the tickets with images and key details
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
    {
      title: "Marathon 2024: City by the Bay",
      description:
        "Lace up for the annual marathon and experience the city's landmarks in a new way.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAK_BOolVnQhD6LAGXdkgkWoZtbVsDBK8nNT5r0d48yg&s",
      points: [
        "Scenic Urban Course",
        "Health & Fitness Expo",
        "For All Skill Levels",
      ],
      extraInfo: "Early bird registration opens soon.",
    },
    {
      title: "Marathon 2024: City by the Bay",
      description:
        "Lace up for the annual marathon and experience the city's landmarks in a new way.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAK_BOolVnQhD6LAGXdkgkWoZtbVsDBK8nNT5r0d48yg&s",
      points: [
        "Scenic Urban Course",
        "Health & Fitness Expo",
        "For All Skill Levels",
      ],
      extraInfo: "Early bird registration opens soon.",
    },
    {
      title: "Marathon 2024: City by the Bay",
      description:
        "Lace up for the annual marathon and experience the city's landmarks in a new way.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAK_BOolVnQhD6LAGXdkgkWoZtbVsDBK8nNT5r0d48yg&s",
      points: [
        "Scenic Urban Course",
        "Health & Fitness Expo",
        "For All Skill Levels",
      ],
      extraInfo: "Early bird registration opens soon.",
    },
    {
      title: "Marathon 2024: City by the Bay",
      description:
        "Lace up for the annual marathon and experience the city's landmarks in a new way.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAK_BOolVnQhD6LAGXdkgkWoZtbVsDBK8nNT5r0d48yg&s",
      points: [
        "Scenic Urban Course",
        "Health & Fitness Expo",
        "For All Skill Levels",
      ],
      extraInfo: "Early bird registration opens soon.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <div className="text-center pb-12 md:pb-16">
        <h1 className="text-4xl font-bold mb-4">
          Explore Exciting Events & Experiences
        </h1>
        <p className="text-xl text-gray-500">
          Discover unique events and secure your tickets with ease. Enhance your
          lifestyle and create memorable moments.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
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
