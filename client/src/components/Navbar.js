"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FaArrowDown } from "react-icons/fa";
import { useTreks } from "@/context/TrekContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { treks } = useTreks();

  return (
    <nav className="sticky top-0 bg-gray-900 z-50">
      <div className="flex justify-between items-center px-10 py-4">
        <Link href={"/"}>
          <h1 className="z-50 text-2xl font-bold text-white tracking-wider">
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
              className="tracking-widest text-white font-semibold hover:text-primary transition-all duration-300"
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
            <button className="tracking-widest text-white font-semibold hover:text-primary transition-all duration-300 flex items-center">
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
              {treks.map((destination) => (
                <li key={destination.name}>
                  <a
                    href={`/itinerary/${destination.name}`}
                    className="block text-sm px-4 py-2 text-black hover:bg-primary hover:text-white transition-all duration-300"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    {destination.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* About-us */}
          <li className="relative group">
            <Link
              href="/about"
              className="tracking-widest text-white font-semibold hover:text-primary transition-all duration-300"
            >
              About-us
            </Link>
            <span className="absolute left-0 bottom-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300"></span>
          </li>

          {/* Contact */}
          <li className="relative group">
            <Link
              href="/contact"
              className="tracking-widest text-white font-semibold hover:text-primary transition-all duration-300"
            >
              Contact
            </Link>
            <span className="absolute left-0 bottom-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`z-30 fixed inset-0 bg-white flex flex-col items-center justify-center space-y-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } md:hidden`}
      >
        {/* Menu Items */}
        <Link href="/" className="nav-item" onClick={() => setIsOpen(false)}>
          Home
        </Link>

        {/* Destinations Dropdown */}
        <div className="relative dropdown-container">
          <button
            className="nav-item flex items-center gap-2"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            Destinations
            <span
              className={`transform transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            >
              <FaArrowDown size={16} />
            </span>
          </button>

          {/* Dropdown List */}
          {dropdownOpen && (
            <ul className="absolute left-1/2 top-full mt-2 w-48 bg-white shadow-lg rounded-lg p-3 transform -translate-x-1/2">
              {treks.map((destination) => (
                <li key={destination.name} className="dropdown-item">
                  <Link
                    href={`/itinerary/${destination.name}`}
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href="/about"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/treks"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          Treks Offered
        </Link>
        <Link
          href="/gallery"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          Gallery
        </Link>
      </div>
    </nav>
  );
}
