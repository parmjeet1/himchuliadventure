"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import gallery4 from "../../../public/images/gallery4.jpg";
import background1 from "../../../public/images/background1.jpg";
import background2 from "../../../public/images/background2.jpg";
import background from "../../../public/images/background.jpg";

const images = [
  { src: gallery4, alt: "Snowy Peaks" },
  { src: background1, alt: "Misty Hills" },
  { src: background2, alt: "Lakeside Camping" },
  { src: background, alt: "Sunset View" },
];

const Gallery = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const swiperRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  const handleImageClick = (index) => {
    swiperRef.current.swiper.slideTo(index);
  };

  return (
    <ParallaxProvider>
      <section
        className="flex flex-col justify-center items-center py-10 h-full md:min-h-screen px-4 bg-black"
        onMouseMove={handleMouseMove}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-wider text-white">
            📸 Our Adventure <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-lg text-secondary font-semibold">
            Explore breathtaking landscapes
          </p>
        </div>

        <div className="relative w-full md:w-3/4">
          <Swiper
            ref={swiperRef}
            slidesPerView={1.5}
            centeredSlides={true}
            spaceBetween={20}
            loop={true}
            navigation={{
              nextEl: ".gallery-next-btn",
              prevEl: ".gallery-prev-btn",
            }}
            modules={[Navigation]}
            className="gallery-swiper"
          >
            {images.map((image, index) => {
              const parallaxX =
                windowSize.width > 768
                  ? (mousePos.x / windowSize.width) * 30 - 5
                  : 0;
              const parallaxY =
                windowSize.width > 768
                  ? (mousePos.y / windowSize.height) * 30 - 5
                  : 0;

              return (
                <SwiperSlide key={index} className="relative overflow-hidden">
                  <div
                    className="relative w-full min-h-[35vh] md:min-h-[70vh] overflow-hidden rounded-lg shadow-lg"
                    style={{
                      transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                      transition: "transform 0.1s ease-out",
                    }}
                  >
                    <Parallax
                      speed={-10}
                      className="relative w-full h-[40vh] lg:h-[500px]"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                        onClick={() => handleImageClick(index)}
                      />
                    </Parallax>
                  </div>

                  <div className="absolute text-primary inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30  text-lg font-semibold">
                    {image.alt}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10">
            <button className="gallery-prev-btn text-white">
              <AiOutlineLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10">
            <button className="gallery-next-btn text-white">
              <AiOutlineRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
};

export default Gallery;
