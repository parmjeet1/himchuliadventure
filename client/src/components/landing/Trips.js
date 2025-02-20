"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

import Link from "next/link";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlinePhone,
  AiOutlineStar,
} from "react-icons/ai";
import { useTreks } from "@/context/TrekContext";

const TrekCarousel = () => {
  const swiperRef = useRef(null);
  const { treks, refreshTreks } = useTreks();
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // function handleRefetch(e) {
  //   e.preventDefault();
  //   refreshTreks();
  // }

  return (
    <div id="treks-offered" className="relative px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">🏔️ Treks Offered</h2>
        <p className="text-lg text-gray-600">
          Explore the most breathtaking trails with us
        </p>
        {/* <button onClick={handleRefetch}>refetch</button> */}
      </div>

      <button
        className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 md:bg-gray-800 text-white p-3 md:rounded-full md:shadow-md transition-all hover:md:bg-gray-600 hover:scale-110"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <AiOutlineLeft size={24} />
      </button>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={40}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="rounded-lg "
      >
        {treks.map((trek, index) => (
          <SwiperSlide
            key={index}
            className="rounded-lg shadow-lg overflow-hidden bg-white"
          >
            <Link href={`/itinerary/${encodeURIComponent(trek.name)}`}>
              <div className="relative w-full h-80">
                <Image
                  src={trek.imageUrl}
                  alt={trek.name}
                  fill
                  className="object-cover rounded-lg"
                  priority={index === 0}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between font-semibold items-center text-gray-600 text-sm">
                  <span>
                    {trek.days} days & {trek.nights} nights
                  </span>
                  <span className="flex items-center text-secondary font-semibold">
                    <AiOutlineStar size={16} /> 4
                    <span className="ml-1">(5)</span>
                  </span>
                </div>
                <h2 className="font-semibold text-secondary text-md mt-2">
                  {trek.name}
                </h2>
                <div
                  className="flex items-center text-sm bg-gray-100 p-1 mt-2 rounded"
                  style={{
                    background: `linear-gradient(
                      rgba(231, 255, 240, 0) 0%, 
                      rgba(219, 255, 232, 0.8) 19.27%, 
                      rgba(219, 255, 232, 0.8) 88.54%, 
                      rgba(231, 255, 240, 0) 100%)`,
                  }}
                >
                  <span className="font-semibold text-sm truncate">
                    {trek.description}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-md font-semibold font-serif text-secondary">
                      INR {trek.cost}/-
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <a href="tel:+91-7895791233">
              <div className="flex items-center bg-primary text-white p-3 rounded-b-lg justify-center cursor-pointer hover:bg-green-800">
                <AiOutlinePhone className="mr-2" size={20} /> Request Callback
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 md:bg-gray-800 text-white p-3 md:rounded-full md:shadow-md transition-all hover:md:bg-gray-600 hover:scale-110"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <AiOutlineRight size={24} />
      </button>
    </div>
  );
};

export default TrekCarousel;
