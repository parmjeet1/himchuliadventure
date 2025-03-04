"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function Countries() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { admin } = useAdminAuth();

  useEffect(() => {
    if (admin?.userId) {
      fetchCountries();
    }
  }, [admin?.userId]);

  // Fetch all countries
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}api/admin/country/${admin.userId}`
      );
      setCountries(response.data.country);
    } catch (error) {
      console.error("Error fetching countries", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Image, Heading, and Paragraph Upload
  const handleImageUpload = async (
    e,
    countryId,
    coverHeading,
    coverParagraph
  ) => {
    const file = e.target.files[0];
    if (!file || !coverHeading || !coverParagraph) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("coverHeading", coverHeading);
    formData.append("coverParagraph", coverParagraph);
    formData.append("countryId", countryId);

    try {
      const response = await axios.post(
        `${BASE_URL}api/admin/dynamic-image/add-image/`,
        formData
      );

      setCountries((prev) =>
        prev.map((c) =>
          c._id === countryId
            ? {
                ...c,
                homeFetaureImage: response.data.imageUrl,
                coverHeading: response.data.coverHeading,
                coverParagraph: response.data.coverParagraph,
              }
            : c
        )
      );
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  // Toggle Grid View Status (only sending countryId)
  const toggleGridView = async (countryId) => {
    try {
      await axios.post(`${BASE_URL}api/admin/country/toggle-status`, {
        countryId,
      });

      setCountries((prev) =>
        prev.map((c) =>
          c._id === countryId ? { ...c, gridViewStatus: !c.gridViewStatus } : c
        )
      );
    } catch (error) {
      console.error("Error updating visibility", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Countries</h1>

      {loading ? (
        <p className="text-center">Loading countries...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <div
              key={country._id}
              className="bg-white p-4 shadow-md rounded-lg"
            >
              {country.homeFetaureImage && (
                <Image
                  src={`${BASE_URL}${country.homeFetaureImage}`}
                  alt={country.name}
                  width={300}
                  height={200}
                  className="rounded-md mb-3"
                />
              )}

              <h2 className="text-xl font-semibold">{country.name}</h2>

              {/* Cover Heading Input */}
              <input
                type="text"
                placeholder="Enter Cover Heading"
                className="border p-2 w-full mt-2"
                onChange={(e) => {
                  setCountries((prev) =>
                    prev.map((c) =>
                      c._id === country._id
                        ? { ...c, coverHeading: e.target.value }
                        : c
                    )
                  );
                }}
                value={country.coverHeading || ""}
              />

              {/* Cover Paragraph Input */}
              <textarea
                placeholder="Enter Cover Paragraph"
                className="border p-2 w-full mt-2"
                rows="2"
                onChange={(e) => {
                  setCountries((prev) =>
                    prev.map((c) =>
                      c._id === country._id
                        ? { ...c, coverParagraph: e.target.value }
                        : c
                    )
                  );
                }}
                value={country.coverParagraph || ""}
              />

              <div className="mt-4 flex justify-between items-center">
                {/* Upload Image Button */}
                <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md">
                  Upload Image
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(
                        e,
                        country._id,
                        country.coverHeading,
                        country.coverParagraph
                      )
                    }
                  />
                </label>

                {/* Toggle Button */}
                <button
                  className={`px-4 py-2 rounded-md ${
                    country.gridViewStatus ? "bg-green-500" : "bg-gray-500"
                  } text-white`}
                  onClick={() => toggleGridView(country._id)}
                >
                  {country.gridViewStatus ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
