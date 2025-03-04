"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HTMLFlipBook from "react-pageflip";

const ExploreIndia = () => {
  const [treks, setTreks] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/country/cover-view`);
        const homeFeatureImage = response.data.countryDetails[0].image; // Extract first image
        setCountries(response.data.countryDetails);

        setCoverImage(homeFeatureImage);
        setTreks(response.data.countryDetails[0].Packages); // Assuming response.data is an array
      } catch (error) {
        console.log("error is coming from explore india");
        console.error("Error fetching data:", error);
      }
    };

    fetchTreks();
  }, []);

  return (
    <section className="min-h-screen max-w-screen-xl mx-auto px-4 flex flex-col justify-center items-center">
      {countries.map((country, index) => (
        <div key={index} className="w-full">
          {/* Cover Image Section */}
          <div className="relative w-full h-[50vh] flex flex-col justify-center items-center text-center p-6 border-4 border-secondary rounded-lg">
            <Image
              src={`${BASE_URL}${country.image}`}
              alt="Explore India"
              fill
              style={{ objectFit: "cover" }}
              className="absolute inset-0 z-0"
            />
            <div className="relative z-10 text-white">
              <h1 className="text-5xl font-extrabold drop-shadow-lg">
                {country.name}
              </h1>
              <p className="text-lg font-semibold mt-2">{country.heading}</p>
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
                {country.Packages.map((trek, trekIndex) => (
                  <SwiperSlide key={trekIndex}>
                    <div className="relative w-full h-80 rounded-lg overflow-hidden group border-4 border-primary cursor-pointer">
                      <Image
                        src={`${BASE_URL}${trek.imageUrl}`}
                        alt={trek.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="absolute inset-0 transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition" />
                      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
                        <h3 className="text-md font-bold text-secondary drop-shadow-lg">
                          {trek.name}
                        </h3>
                        <p className="text-sm font-semibold text-white mt-2">
                          Starting from{" "}
                          <span className="text-primary">₹{trek.cost}/-</span>
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Mobile: Flipbook Section */}
          <div className="w-full py-12 text-center -mt-32 md:hidden">
            <div className="w-full max-w-xs mx-auto">
              <HTMLFlipBook
                width={300}
                height={400}
                className="shadow-lg border border-secondary"
              >
                {country.Packages.map((trek, trekIndex) => (
                  <div key={trekIndex} className="relative w-full h-full p-4">
                    <Image
                      src={`${BASE_URL}${trek.imageUrl}`}
                      alt={trek.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                      <h3 className="text-xl font-bold text-secondary drop-shadow-lg">
                        {trek.name}
                      </h3>
                      <p className="text-md font-semibold text-gray-300 mt-2">
                        Starting from{" "}
                        <span className="text-primary">₹{trek.cost}/-</span>
                      </p>
                    </div>
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ExploreIndia;
