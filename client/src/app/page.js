"use client";

import ContactUs from "@/components/landing/Contactus";
import Destination from "@/components/landing/Destination";
import ExploreIndia from "@/components/landing/ExploreIndia";
import Gallery from "@/components/landing/Gallery";
import Hero from "@/components/landing/Hero";
import Trips from "@/components/landing/Trips";

export default function Home() {
  return (
    <main>
      <Hero />
      <Destination />

      <div
        className="relative"
        style={{
          background: `linear-gradient(
            rgba(231, 255, 240, 0) 0%, 
            rgba(219, 255, 232, 0.8) 19.27%, 
            rgba(219, 255, 232, 0.8) 88.54%, 
            rgba(231, 255, 240, 0) 100%)`,
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <Trips />
        </div>
      </div>
      <div
        className="relative"
        style={{
          background: `linear-gradient(
            rgba(231, 240, 255, 0) 0%, 
            rgba(219, 232, 255, 0.8) 19.27%, 
            rgba(219, 232, 255, 0.8) 88.54%, 
            rgba(231, 240, 255, 0) 100%
          )`,
        }}
      >
        <ExploreIndia />
        <Gallery />
        <ContactUs />
      </div>
    </main>
  );
}
