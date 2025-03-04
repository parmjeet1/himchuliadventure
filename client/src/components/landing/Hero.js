"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

import background1 from "../../../public/images/background1.jpg";
import background2 from "../../../public/images/background2.jpg";
import background3 from "../../../public/images/background.jpg";
import axios from "axios";

const backgroundImages = [background1, background2, background3];

const phrases = ["Paradise", "Serenity", "Tranquility", "Nature", "Freedom"];

function Hero() {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [treks, setTreks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Store user input
  const [filteredTreks, setFilteredTreks] = useState([]); // Filtered treks for dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/package/6`)
      .then((response) => {
        setTreks(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the the trek data inside hero, ", error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Handle user input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter treks based on input
    if (value.length > 0) {
      const filtered = treks.filter((trek) =>
        trek.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTreks(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  // Handle selection from dropdown
  const handleSelectTrek = (trekName) => {
    setSearchTerm(trekName);
    setShowDropdown(false);

    router.push(`/itinerary/${encodeURIComponent(trekName)}`);
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
          Escape to{" "}
          <Typewriter
            words={phrases}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>

        {/* Search Input with Dropdown */}
        <div className="relative flex flex-col items-center justify-center w-80 sm:w-96">
          <input
            type="text"
            placeholder="Search for destinations..."
            value={searchTerm}
            onChange={handleInputChange}
            className="p-3 w-full rounded-full placeholder:text-white placeholder:tracking-wider text-white border-2 border-primary outline-none bg-transparent transition-transform duration-300 ease-in-out transform focus:scale-105 focus:ring-2 focus:ring-primary"
          />
          <button className="p-3 absolute right-4 text-white">
            <FaSearch />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <ul className="absolute top-16 w-full bg-white text-black rounded-lg shadow-lg max-h-40 overflow-y-auto z-20">
              {filteredTreks.length > 0 ? (
                filteredTreks.map((trek, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-primary hover:text-white cursor-pointer transition-all"
                    onClick={() => handleSelectTrek(trek.name)}
                  >
                    {trek.name}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}
        </div>

        <div
          className="absolute bottom-10 animate-bounce text-3xl cursor-pointer"
          onClick={() => {
            document.getElementById("treks-offered")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <span className="text-primary">↓</span>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${backgroundImages[currentImage].src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </section>
  );
}

export default Hero;
