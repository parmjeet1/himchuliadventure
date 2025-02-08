"use client";

import React from "react";
import Image from "next/image";
import bgImage from "../../../public/images/background.jpg";
import adventureIcon from "../../../public/images/background1.jpg";
import exploreIcon from "../../../public/images/background2.jpg";
import destinationIcon from "../../../public/images/gallery1.jpg";

export default function AboutUs() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center text-center ">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] flex items-center justify-center text-white text-4xl font-bold bg-black bg-opacity-50">
        <Image
          src={bgImage}
          alt="Travel Background"
          layout="fill"
          objectFit="cover"
          className="absolute z-[-1]"
        />
        <h1 className="z-10 drop-shadow-lg">Discover. Explore. Experience.</h1>
      </div>

      {/* About Section */}
      <div className="max-w-4xl px-6 py-12">
        <h2 className="text-3xl font-extrabold text-primary">Who We Are</h2>
        <p className="text-gray-700 mt-4 text-lg">
          At{" "}
          <span className="text-secondary font-semibold">
            Himculi Adventures
          </span>
          , we are passionate about creating unforgettable adventures. Whether
          you're looking for a challenging trek through the Himalayas or a
          serene getaway in nature, we offer the perfect travel experience
          tailored to you.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl px-6 py-12">
        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
          <Image src={adventureIcon} alt="Adventure" width={60} height={60} />
          <h3 className="text-xl font-semibold mt-4">Thrilling Adventures</h3>
          <p className="text-gray-600 mt-2 text-center">
            Embark on carefully curated treks that offer breathtaking landscapes
            and unforgettable moments.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
          <Image src={exploreIcon} alt="Explore" width={60} height={60} />
          <h3 className="text-xl font-semibold mt-4">Explore Hidden Gems</h3>
          <p className="text-gray-600 mt-2 text-center">
            Discover offbeat locations and immerse yourself in the beauty of
            untouched nature.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
          <Image
            src={destinationIcon}
            alt="Destination"
            width={60}
            height={60}
          />
          <h3 className="text-xl font-semibold mt-4">
            Your Perfect Destination
          </h3>
          <p className="text-gray-600 mt-2 text-center">
            Choose from our wide range of treks and destinations to find the
            adventure that suits you best.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl text-center px-6 py-12">
        <h2 className="text-2xl font-bold text-primary">
          Start Your Journey Today!
        </h2>
        <p className="text-gray-700 mt-4 text-lg">
          Whether you're a seasoned trekker or just starting out, we have the
          perfect adventure for you. Let’s explore the world together!
        </p>
        <button className="mt-6 px-6 py-3 bg-secondary text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-primary transition">
          Explore Treks
        </button>
      </div>
    </section>
  );
}
