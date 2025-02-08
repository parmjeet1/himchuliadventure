"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import Badimalika from "../../../public/images/background.jpg";
import kagbhusandi from "../../../public/images/background1.jpg";
import phoksundo from "../../../public/images/background2.jpg";
import manaslu from "../../../public/images/background1.jpg";

const treks = [
  {
    name: "Badimalika Trek",
    location: "Far-Western Nepal",
    duration: "7–10 days",
    highlights: "Sacred temple, lush meadows, rich culture",
    bestTime: "Sept–Nov, Mar–May",
    image: Badimalika,
  },
  {
    name: "Kagbhusandi Trek",
    location: "Near Nanda Devi, India-Nepal border",
    duration: "8–12 days",
    highlights: "Scenic lake, panoramic mountain views",
    bestTime: "May–Oct",
    image: kagbhusandi,
  },
  {
    name: "Phoksundo Lake Trek",
    location: "Dolpo Region, Nepal",
    duration: "6–9 days",
    highlights: "Deepest lake, Tibetan culture, stunning landscapes",
    bestTime: "Apr–Jun, Sept–Nov",
    image: phoksundo,
  },
  {
    name: "Manaslu Circuit Trek",
    location: "Gorkha District, Nepal",
    duration: "14–18 days",
    highlights: "Remote scenery, Larkya La Pass, Tibetan culture",
    bestTime: "Mar–May, Sept–Nov",
    image: manaslu,
  },
];

const TrekCarousel = () => {
  const swiperRef = useRef(null);

  return (
    <div className="relative px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">🏔️ Treks Offered</h2>
        <p className="text-lg text-gray-600">
          Explore the most breathtaking trails with us
        </p>
      </div>
      <button
        className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2  md:bg-gray-800 text-white p-3 md:rounded-full md:shadow-md transition-all hover:md:bg-gray-600 hover:scale-110"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <AiOutlineLeft size={24} />
      </button>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={20}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="rounded-lg shadow-lg"
      >
        {treks.map((trek, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col items-center rounded-lg shadow-lg bg-white"
          >
            <Link href={`/itinerary/${encodeURIComponent(trek.name)}`}>
              <div className="relative w-full h-80 ">
                <Image
                  src={trek.image}
                  alt={trek.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="object-cover rounded-lg"
                  priority={index === 0}
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-xl mb-3 font-bold text-secondary">
                  {trek.name}
                </h2>
                <p className="text-sm mb-3 text-gray-600">📍 {trek.location}</p>
                <p className="text-sm mb-3 text-gray-600">⏳ {trek.duration}</p>
                <p className="text-sm mb-3 text-gray-600">
                  🌿 {trek.highlights}
                </p>
                <p className="text-sm mb-3 font-semibold text-gray-600">
                  🧭 {trek.bestTime}
                </p>
              </div>
              <button className="w-full bg-primary text-white font-semibold tracking-wider py-3">
                Learn More
              </button>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2  md:bg-gray-800 text-white p-3 md:rounded-full md:shadow-md transition-all hover:md:bg-gray-600 hover:scale-110"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <AiOutlineRight size={24} />
      </button>
    </div>
  );
};

export default TrekCarousel;
