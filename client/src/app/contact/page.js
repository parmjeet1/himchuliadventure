"use client";
import React from "react";
import ContactUs from "@/components/landing/Contactus";
import Image from "next/image";
import travelBanner from "../../../public/images/background.jpg";

function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-80 md:h-96 flex items-center justify-center bg-gray-800 text-white">
        <Image
          src={travelBanner}
          alt="Travel Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold relative z-10">
          Contact Us
        </h1>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 py-12 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="bg-gray-100 p-4 rounded-lg">
            <summary className="font-semibold cursor-pointer">
              How do I book a trip?
            </summary>
            <p className="mt-2 text-gray-600">
              You can browse our packages, select your preferred destination,
              and complete the booking process online.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-lg">
            <summary className="font-semibold cursor-pointer">
              What payment methods do you accept?
            </summary>
            <p className="mt-2 text-gray-600">
              We accept credit/debit cards, PayPal, and direct bank transfers.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-lg">
            <summary className="font-semibold cursor-pointer">
              Can I customize my travel package?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes! Contact us, and we’ll help you tailor your trip to your
              preferences.
            </p>
          </details>
        </div>

        {/* Contact Us Form */}
        <div className="container mx-auto px-6 py-12">
          <ContactUs />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
