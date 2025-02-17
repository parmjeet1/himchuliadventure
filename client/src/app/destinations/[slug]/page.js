import Image from "next/image";
import { destinationDetails } from "@/app/data/destinationDetail";
import { FaCalendarAlt, FaMapMarkerAlt, FaRunning } from "react-icons/fa"; // Import react-icons

export default function DestinationPage({ params }) {
  const { slug } = params;

  // Find the destination by matching the slug
  const destination = destinationDetails.find(
    (dest) => dest.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!destination) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Destination not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-96">
        <Image
          src={destination.image}
          alt={destination.name}
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{destination.name}</h1>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-4xl mx-auto mt-8 px-6 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          About {destination.name}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {destination.description}
        </p>

        {/* Best Time to Visit */}
        <div className="mt-6 flex items-center space-x-4">
          <FaCalendarAlt className="text-blue-500 w-6 h-6" />
          <p className="text-gray-700">
            <strong>Best Time to Visit:</strong> {destination.bestSeason}
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaMapMarkerAlt className="text-green-500 w-6 h-6 mr-2" />{" "}
            Highlights
          </h3>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-gray-600">
            {destination.highlights.map((highlight, index) => (
              <li
                key={index}
                className="bg-gray-100 px-3 py-2 rounded-md shadow-sm"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Activities */}
        {destination.activities && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaRunning className="text-red-500 w-6 h-6 mr-2" /> Popular
              Activities
            </h3>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-gray-600">
              {destination.activities.map((activity, index) => (
                <li
                  key={index}
                  className="bg-blue-100 px-3 py-2 rounded-md shadow-sm"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
