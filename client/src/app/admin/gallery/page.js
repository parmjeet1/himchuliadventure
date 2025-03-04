"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Gallery() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const quotes = [
    "Serene",
    "Summit",
    "Breeze",
    "Wilderness",
    "Zen",
    "Elevate",
    "Misty",
    "Peak",
    "Tranquil",
    "Evergreen",
    "Horizon",
    "Ridge",
    "Foggy",
    "Majestic",
    "Glacier",
    "Echo",
    "Valley",
    "Pine",
    "Summit",
    "Vista",
  ];

  // Fetch existing images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}api/admin/dynamic-image/all-images`
        );
        setExistingImages(response.data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setSelectedImagePath(null);
    }
  };

  // Handle Existing Image Selection
  const handleImageSelect = (imagePath) => {
    setSelectedImagePath(imagePath);
    setSelectedFile(null);
    setPreview(`${BASE_URL}${imagePath}`);
  };

  // Handle Upload
  const handleUpload = async () => {
    setLoading(true);
    setMessage("");

    try {
      let response;
      const galleryAlt = quotes[Math.floor(Math.random() * quotes.length)];
      if (selectedFile) {
        // Upload new file
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("glleryaltTag", galleryAlt);

        response = await axios.post(
          `${BASE_URL}api/admin/dynamic-image/add-image`,
          formData
        );
      } else if (selectedImagePath) {
        const image = selectedImagePath.replace("/uploads/", "");

        // Send existing image path
        response = await axios.post(
          `${BASE_URL}api/admin/dynamic-image/add-image`,
          {
            image,
            glleryaltTag: galleryAlt,
          }
        );
      } else {
        setMessage("Please select a file or an existing image.");
        return;
      }

      setMessage(response.data.message || "Upload successful!");
      setSelectedFile(null);
      setSelectedImagePath(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Upload or Select an Image</h2>

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-3"
      />

      {/* Image Preview */}
      {preview && (
        <Image
          width={400}
          height={400}
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded mb-3"
        />
      )}

      {/* Existing Images Selection */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {existingImages.map((imgPath) => (
          <div
            key={imgPath}
            className={`p-1 border-2 ${
              selectedImagePath === imgPath
                ? "border-blue-500"
                : "border-gray-300"
            } rounded cursor-pointer`}
            onClick={() => handleImageSelect(imgPath)}
          >
            <Image
              width={100}
              height={100}
              src={`${BASE_URL}${imgPath}`}
              alt="Existing Image"
              className="w-24 h-24 object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 mt-4"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Submit"}
      </button>

      {/* Message */}
      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
