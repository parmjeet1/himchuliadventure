"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-green-50 shadow-md">
      <div className="flex justify-between items-center px-10 py-4">
        <Link href={"/"}>
          <h1 className="z-50 text-2xl font-bold text-secondary tracking-wider">
            HIMCHULI
          </h1>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block h-1 w-6 bg-primary rounded transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-1 w-6 bg-primary rounded transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 w-6 bg-primary rounded transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Desktop Navbar */}
        <ul className="hidden md:flex space-x-10 ">
          <li className="relative group">
            <Link
              href="/"
              className="tracking-widest font-semibold hover:text-primary transition-all duration-300"
            >
              Home
            </Link>
            <span className="absolute left-0 bottom-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300"></span>
          </li>

          <li
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="tracking-widest font-semibold hover:text-primary transition-all duration-300 flex items-center">
              Destinations
              <svg
                className="w-4 h-4 ml-1 transition-transform duration-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown List */}
            <ul
              className={`z-20 absolute left-0 mt-5 w-full bg-green-50  shadow-md transition-all duration-300 ${
                dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {[
                "Everest Base Camp",
                "Annapurna Circuit",
                "Langtang Valley",
              ].map((destination) => (
                <li key={destination}>
                  <a
                    href={`#${destination.toLowerCase().replace(/ /g, "-")}`}
                    className="block text-sm px-4 py-2 text-black hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* About-us */}
          <li className="relative group">
            <Link
              href="/about"
              className="tracking-widest font-semibold hover:text-primary transition-all duration-300"
            >
              About-us
            </Link>
            <span className="absolute left-0 bottom-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300"></span>
          </li>

          {/* Contact */}
          <li className="relative group">
            <Link
              href="/contact"
              className="tracking-widest font-semibold hover:text-primary transition-all duration-300"
            >
              Contact
            </Link>
            <span className="absolute left-0 bottom-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`z-30 fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 transition-all duration-300 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } md:hidden`}
      >
        {/* Home */}
        <a
          href="#home"
          className="text-2xl tracking-widest font-semibold hover:text-gray-900 transition"
          onClick={() => setIsOpen(false)}
        >
          Home
        </a>

        {/* Destinations Dropdown for Mobile */}
        <div className="relative">
          <button
            className="text-2xl tracking-widest font-semibold hover:text-gray-900 transition flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Destinations
            <svg
              className={`w-5 h-5 ml-2 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown List for Mobile */}
          {dropdownOpen && (
            <ul className="mt-2 space-y-3 text-center">
              {[
                "Everest Base Camp",
                "Annapurna Circuit",
                "Langtang Valley",
              ].map((destination) => (
                <li key={destination}>
                  <a
                    href={`#${destination.toLowerCase().replace(/ /g, "-")}`}
                    className="text-xl tracking-widest font-semibold hover:text-primary transition"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* About-us */}
        <a
          href="#about-us"
          className="text-2xl tracking-widest font-semibold hover:text-gray-900 transition"
          onClick={() => setIsOpen(false)}
        >
          About-us
        </a>

        {/* Contact */}
        <a
          href="#contact"
          className="text-2xl tracking-widest font-semibold hover:text-gray-900 transition"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
