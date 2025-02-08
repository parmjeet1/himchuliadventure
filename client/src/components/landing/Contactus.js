"use client";
import React, { useState } from "react";
import { FaPhoneAlt, FaUserAlt, FaEnvelope, FaPen } from "react-icons/fa";
import illustrate from "../../../public/images/contact.jpg";
import Image from "next/image";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, mobile, message });
  };

  return (
    <div className="h-full md:min-h-screen flex justify-center items-center py-12 ">
      <div className="max-w-7xl w-full flex items-center justify-center md:space-x-12 px-6">
        <div className="hidden md:flex flex-col justify-center w-full sm:w-1/2 mb-8 sm:mb-0">
          <Image
            src={illustrate}
            alt="Illustration"
            className="w-full h-auto rounded-lg shadow-xl"
            priority
          />
        </div>

        <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold text-center text-secondary mb-4">
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Your Name"
                required
              />
              <FaUserAlt className="absolute left-3 top-3 text-gray-500" />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Your Email"
                required
              />
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            </div>

            <div className="relative">
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Your Mobile Number"
                required
              />
              <FaPhoneAlt className="absolute left-3 top-3 text-gray-500" />
            </div>

            <div className="relative">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                placeholder="Your Message"
                rows="4"
                required
              />
              <FaPen className="absolute left-3 top-3 text-gray-500" />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-primary-dark focus:outline-none transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
