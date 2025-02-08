"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import background from "../../../../public/images/background2.jpg";
import {
  FaPhoneAlt,
  FaUserAlt,
  FaEnvelope,
  FaPen,
  FaPlus,
  FaMinus,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const itinerary = {
  name: "Kagbhusandi Trek",
  location: "Uttarakhand, India",
  duration: "7 Days / 6 Nights",
  difficulty: "Moderate to Difficult",
  best_time: ["June", "July", "September", "October"],
  starting_point: "Govind Ghat",
  ending_point: "Govind Ghat",
  altitude: "5,230 meters (17,160 feet)",
  distance: "45 km approx",
  highlights: [
    "Spectacular views of Hathi Parvat and Chaukhamba Peaks",
    "Glacial lake Kagbhusandi Tal with emerald green waters",
    "Rich flora and fauna in the Nanda Devi Biosphere Reserve",
    "Mythological significance associated with the Ramayana",
  ],
  day_wise_itinerary: [
    {
      day: 1,
      title: "Arrival at Govind Ghat",
      description:
        "Arrive at Govind Ghat, a small town near Joshimath. Acclimatization and preparation for the trek.",
    },
    {
      day: 2,
      title: "Govind Ghat to Bhyundar Village",
      description:
        "Begin trekking towards Bhyundar Village, passing through scenic valleys and small streams.",
    },
    {
      day: 3,
      title: "Bhyundar to Simartoli Camp",
      description:
        "Trek through lush meadows and rhododendron forests to reach Simartoli Camp.",
    },
    {
      day: 4,
      title: "Simartoli to Kagbhusandi Tal",
      description:
        "A challenging ascent to Kagbhusandi Tal, a pristine glacial lake surrounded by mighty Himalayan peaks.",
    },
    {
      day: 5,
      title: "Exploration & Acclimatization at Kagbhusandi Tal",
      description:
        "Spend the day exploring the lake, taking in panoramic views, and acclimatizing to the high altitude.",
    },
    {
      day: 6,
      title: "Kagbhusandi Tal to Bhyundar",
      description:
        "Start descending back towards Bhyundar Village through scenic landscapes.",
    },
    {
      day: 7,
      title: "Bhyundar to Govind Ghat",
      description:
        "Complete the final leg of the trek and return to Govind Ghat.",
    },
  ],
  inclusions: [
    "Accommodation in tents or guesthouses during the trek",
    "All meals (breakfast, lunch, dinner) during the trek",
    "Experienced trek guide and support staff",
    "Trekking permits and forest entry fees",
    "First-aid and oxygen cylinder for emergencies",
  ],
  exclusions: [
    "Travel expenses to and from Govind Ghat",
    "Personal expenses (snacks, beverages, laundry, etc.)",
    "Insurance for travel, medical, or accidents",
    "Porter or mule charges for carrying personal luggage",
    "Any additional costs due to weather conditions or unforeseen circumstances",
  ],
};

export default function ItineraryPage() {
  const [expandedDays, setExpandedDays] = useState({});
  const { trekname } = useParams();
  const trekName = decodeURIComponent(trekname);

  useEffect(() => {
    console.log("Trek Name from URL:", trekName);
  }, [trekName]);

  const toggleDescription = (day) => {
    setExpandedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <section>
      {/* Hero Section */}
      <div
        className="h-[50vh] md:h-[70vh] text-3xl md:text-4xl text-white flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background.src})` }}
      >
        {trekName}
      </div>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto px-4 mt-10 md:mt-16">
        {/* Itinerary Details */}
        <div className="flex-[3] p-4 md:p-6 relative">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {itinerary.name}
          </h1>
          <p className="text-gray-600 mt-2 flex flex-wrap gap-2 items-center">
            <FaMapMarkerAlt className=" text-lg md:text-xl" />{" "}
            {itinerary.location}
            <FaClock className=" text-lg md:text-xl" /> {itinerary.duration}
          </p>

          <div
            className="sticky top-0 shadow-md z-10 mt-6 "
            style={{
              background:
                "linear-gradient(rgba(231, 255, 231, 0) 0%, rgba(219, 255, 219, 0.8) 19.27%, rgba(219, 255, 219, 0.8) 88.54%, rgba(231, 255, 231, 0) 100%)",
            }}
          >
            {/* Navbar Container */}
            <nav className="flex items-center justify-between border-b px-4 py-2 md:px-6 md:py-3">
              {/* Desktop Navbar (Visible on Medium+ Screens) */}
              <div className="hidden md:flex space-x-6">
                {[
                  ["Highlights", "highlights"],
                  ["Itinerary", "itinerary"],
                  ["Inclusions", "inclusions"],
                  ["Exclusions", "exclusions"],
                ].map(([name, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="px-3 py-2 text-gray-700 font-medium hover:text-primary transition-all"
                  >
                    {name}
                  </a>
                ))}
              </div>

              {/* Mobile Navbar (Scrollable Tabs) */}
              <div className="md:hidden overflow-x-auto flex space-x-4 w-full px-2 py-2 scrollbar-hide">
                {[
                  ["Highlights", "highlights"],
                  ["Itinerary", "itinerary"],
                  ["Inclusions", "inclusions"],
                  ["Exclusions", "exclusions"],
                ].map(([name, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="whitespace-nowrap px-4 py-2 bg-gray-100 rounded-lg text-gray-700 text-sm font-medium hover:bg-primary hover:text-white transition"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Itinerary Content */}
          <div className="mt-4">
            {/* Highlights Section */}
            <div id="highlights" className="mt-6">
              <h2 className="text-lg md:text-xl font-semibold text-primary">
                Highlights
              </h2>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                {itinerary.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            {/* Day-wise Itinerary Section */}
            <div id="itinerary" className="mt-6">
              <h2 className="text-lg md:text-xl font-semibold text-primary">
                Day-Wise Itinerary
              </h2>
              <div className="mt-4 space-y-3 md:space-y-4">
                {itinerary.day_wise_itinerary.map((day) => (
                  <div key={day.day} className="border rounded-lg bg-gray-50">
                    <div
                      className="p-3 md:p-4 flex justify-between items-center cursor-pointer hover:shadow-md transition"
                      onClick={() => toggleDescription(day.day)}
                    >
                      <h3 className="font-bold text-md md:text-lg text-secondary">
                        Day {day.day}: {day.title}
                      </h3>
                      {expandedDays[day.day] ? (
                        <FaMinus className="text-primary" />
                      ) : (
                        <FaPlus className="text-primary" />
                      )}
                    </div>
                    {expandedDays[day.day] && (
                      <div className="p-3 md:p-4 border-t bg-white">
                        <p className="text-gray-700">{day.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions Section */}
            <div id="inclusions" className="mt-6">
              <h2 className="text-green-700 text-xl font-bold mb-4 flex items-center">
                ✅ Inclusions
              </h2>
              <ul className="list-none space-y-3">
                {itinerary.inclusions.map((item, index) => (
                  <li key={index} className="flex items-center text-green-900">
                    <span className="mr-2">✔️</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions Section */}
            <div id="exclusions" className="mt-6">
              <h2 className="text-red-700 text-xl font-bold mb-4 flex items-center">
                ❌ Exclusions
              </h2>
              <ul className="list-none space-y-3">
                {itinerary.exclusions.map((item, index) => (
                  <li key={index} className="flex items-center text-red-900">
                    <span className="mr-2">❌</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-[1] sticky top-10 shadow-lg h-auto md:h-[70vh] p-4 md:p-6 rounded-lg bg-gray-100 mt-6 md:mt-0">
          <h1 className="text-secondary font-semibold text-xl md:text-2xl text-center md:text-left">
            Mountains are calling?
          </h1>
          <form className="space-y-3 md:space-y-4 mt-4">
            {[
              ["text", "Your Name", FaUserAlt],
              ["email", "Your Email", FaEnvelope],
              ["tel", "Your Mobile Number", FaPhoneAlt],
            ].map(([type, placeholder, Icon], idx) => (
              <div key={idx} className="relative">
                <input
                  type={type}
                  className="w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-primary"
                  placeholder={placeholder}
                  required
                />
                <Icon className="absolute left-3 top-3 text-primary" />
              </div>
            ))}

            <div className="relative">
              <textarea
                className="w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-primary resize-none"
                placeholder="Your Message"
                rows="4"
                required
              />
              <FaPen className="absolute left-3 top-3 text-primary" />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-secondary text-white rounded-lg hover:bg-primary-dark transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
