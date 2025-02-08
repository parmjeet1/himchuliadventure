"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HTMLFlipBook from "react-pageflip"; // Import FlipBook

import background from "../../../public/images/background.jpg";
import image1 from "../../../public/images/background1.jpg";
import image2 from "../../../public/images/background2.jpg";
import image3 from "../../../public/images/gallery1.jpg";
import image4 from "../../../public/images/gallery2.jpg";
import rajasthan from "../../../public/images/gallery4.jpg";

const treks = [
  { state: "Rajasthan", starting_price: 7999, img: rajasthan },
  { state: "Goa", starting_price: 5999, img: image1 },
  { state: "Himachal Pradesh", starting_price: 6999, img: image2 },
  { state: "Uttarakhand", starting_price: 6499, img: image3 },
  { state: "Kerala", starting_price: 8999, img: image4 },
];

function ExploreIndia() {
  return (
    <section className="min-h-screen max-w-screen-xl mx-auto px-4 flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] flex flex-col justify-center items-center text-center p-6 border-4 border-secondary rounded-lg">
        <Image
          src={background}
          alt="Explore India"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Explore India
          </h1>
          <p className="text-lg font-semibold text-gray-200 mt-2">
            A Journey Through Culture, Heritage, and Adventure!
          </p>
        </div>
      </div>

      {/* Desktop: Trek Carousel Section */}
      <div className="w-full py-12 text-center -mt-24 hidden md:block">
        <div className="w-full max-w-6xl mx-auto px-6">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={4}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              1024: { slidesPerView: 4 },
              768: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
            }}
          >
            {treks.map((trek, index) => (
              <SwiperSlide key={index}>
                <button
                  className="relative w-full h-80 rounded-lg overflow-hidden group border-4 border-secondary cursor-pointer"
                  onClick={() => alert(`Viewing ${trek.state}`)}
                >
                  <Image
                    src={trek.img}
                    alt={trek.state}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 transition-transform group-hover:scale-105"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition" />
                  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
                    <h3 className="text-xl font-bold text-primary drop-shadow-lg">
                      {trek.state}
                    </h3>
                    <p className="text-md font-semibold text-white mt-2">
                      Starting from{" "}
                      <span className="text-primary">
                        ₹{trek.starting_price}/-
                      </span>
                    </p>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile: Flipbook Section */}
      <div className="w-full py-12 text-center -mt-24 md:hidden">
        <div className="w-full max-w-xs mx-auto">
          <HTMLFlipBook
            width={300}
            height={400}
            className="shadow-lg border border-secondary"
          >
            {treks.map((trek, index) => (
              <div key={index} className="relative w-full h-full p-4">
                {/* Background Image */}
                <Image
                  src={trek.img}
                  alt={trek.state}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {trek.state}
                  </h3>
                  <p className="text-md font-semibold text-gray-300 mt-2">
                    Starting from{" "}
                    <span className="text-yellow-400">
                      ₹{trek.starting_price}/-
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
    </section>
  );
}

export default ExploreIndia;
