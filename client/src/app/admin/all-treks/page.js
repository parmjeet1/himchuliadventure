"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllTreks() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Store initial and current states
  const [initialFeaturedTreks, setInitialFeaturedTreks] = useState([]);
  const [initialCountryViewTreks, setInitialCountryViewTreks] = useState([]);
  const [featuredTreks, setFeaturedTreks] = useState([]);
  const [countryViewTreks, setCountryViewTreks] = useState([]);

  // Fetch Treks
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/all-packages`);
        const allTreks = response.data.allpackages;

        console.log("this is the response", allTreks);
        setTreks(allTreks);

        const initialFeatured = allTreks
          .filter((trek) => trek.featuredStatus)
          .map((trek) => trek._id);
        const initialCountryView = allTreks
          .filter((trek) => trek.countryViewStatus)
          .map((trek) => trek._id);

        setInitialFeaturedTreks(initialFeatured);
        setInitialCountryViewTreks(initialCountryView);
        setFeaturedTreks(initialFeatured);
        setCountryViewTreks(initialCountryView);
      } catch (error) {
        setError("Error while fetching packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Toggle Status
  const toggleStatus = (id, statusArray, setStatusArray) => {
    setStatusArray((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  // Get Only Changed Values
  const getChangedTreks = (initialArray, currentArray) => {
    return [
      ...initialArray.filter((id) => !currentArray.includes(id)), // Removed
      ...currentArray.filter((id) => !initialArray.includes(id)), // Added
    ];
  };

  // Save Changes
  const saveChanges = async () => {
    setIsSaving(true);

    const featuredStatusChanged = getChangedTreks(
      initialFeaturedTreks,
      featuredTreks
    );
    const countryViewStatusChanged = getChangedTreks(
      initialCountryViewTreks,
      countryViewTreks
    );

    try {
      const response = await axios.post(
        `${BASE_URL}api/admin/toggle-status/update`,
        {
          packageIdsForFeaturedStatus: featuredStatusChanged,
          packageIdsForCountryStatus: countryViewStatusChanged,
        }
      );

      if (response.status === 200) {
        toast.success("Changes saved successfully! 🎉");
      }
    } catch (error) {
      toast.error("Error saving changes! ❌");
      console.error("Error saving changes", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading treks...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-indigo-50 mt-10 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Treks</h1>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treks.map((trek) => {
          const isFeatured = featuredTreks.includes(trek._id);
          const isCountryView = countryViewTreks.includes(trek._id);

          return (
            <div
              key={trek._id}
              className="bg-white p-4 shadow-xl rounded-xl flex flex-col items-center transition-transform transform hover:scale-105 duration-300"
            >
              {/* Trek Image */}
              <div className="w-full h-64 overflow-hidden rounded-t-lg">
                <Image
                  src={`${BASE_URL}${trek.imageUrl}`}
                  alt={trek.name}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {trek.name}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">{trek.description}</p>
                <p className="text-indigo-600 font-bold mt-2">
                  Cost: ₹{trek.cost}
                </p>
                <p className="text-gray-500">
                  {trek.days} Days / {trek.nights} Nights
                </p>
              </div>

              {/* Featured Status */}
              <button
                className={`px-5 py-2 mt-2 font-semibold text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 ${
                  isFeatured
                    ? "bg-gradient-to-r from-red-500 to-red-700 hover:scale-105"
                    : "bg-gradient-to-r from-green-500 to-green-700 hover:scale-105"
                }`}
                onClick={() =>
                  toggleStatus(trek._id, featuredTreks, setFeaturedTreks)
                }
              >
                {isFeatured ? "⭐ Remove Featured" : "⭐ Make Featured"}
              </button>

              {/* Country View Status */}
              <button
                className={`px-5 py-2 mt-2 font-semibold text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 ${
                  isCountryView
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105"
                    : "bg-gradient-to-r from-teal-500 to-teal-700 hover:scale-105"
                }`}
                onClick={() =>
                  toggleStatus(trek._id, countryViewTreks, setCountryViewTreks)
                }
              >
                {isCountryView
                  ? "🌍 Remove Country View"
                  : "🌍 Add to Country View"}
              </button>
            </div>
          );
        })}
      </div>

      <button
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg mt-6 disabled:opacity-50 hover:bg-blue-700 transition-all duration-300"
        onClick={saveChanges}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
