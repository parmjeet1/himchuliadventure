"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function AddAminities() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [aminities, setAminities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAminity, setNewAminity] = useState({
    AmintiesName: "",
    inclusion: [],
    exclusion: [],
  });

  const [tempInclusion, setTempInclusion] = useState("");
  const [tempExclusion, setTempExclusion] = useState("");

  useEffect(() => {
    const fetchAminities = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}api/inclusoin-exclusion/fetch`
        );
        setAminities(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAminities();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAminity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Add Inclusion
  const addInclusion = () => {
    if (tempInclusion.trim() !== "") {
      setNewAminity((prev) => ({
        ...prev,
        inclusion: [...prev.inclusion, tempInclusion.trim()],
      }));
      setTempInclusion(""); // Clear input
    }
  };

  // ✅ Add Exclusion
  const addExclusion = () => {
    if (tempExclusion.trim() !== "") {
      setNewAminity((prev) => ({
        ...prev,
        exclusion: [...prev.exclusion, tempExclusion.trim()],
      }));
      setTempExclusion(""); // Clear input
    }
  };

  // ✅ Remove Inclusion
  const removeInclusion = (index) => {
    setNewAminity((prev) => ({
      ...prev,
      inclusion: prev.inclusion.filter((_, i) => i !== index),
    }));
  };

  // ✅ Remove Exclusion
  const removeExclusion = (index) => {
    setNewAminity((prev) => ({
      ...prev,
      exclusion: prev.exclusion.filter((_, i) => i !== index),
    }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}api/inclusoin-exclusion/add`,
        newAminity,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Added Successfully", response.data);
      alert("Amenity added successfully!");
      setNewAminity({ AmintiesName: "", inclusion: [], exclusion: [] });
    } catch (error) {
      console.error("Error adding amenity:", error);
      alert("Failed to add amenity");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-indigo-50 mt-10 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Amenities</h1>

      {/* ✅ ADD NEW AMENITY FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Amenity</h2>

        {/* Amenity Name */}
        <input
          type="text"
          name="AmintiesName"
          value={newAminity.AmintiesName}
          onChange={handleChange}
          placeholder="Amenity Name"
          className="w-full p-2 border rounded mb-3"
          required
        />

        {/* Inclusion Input */}
        <div className="mb-3">
          <input
            type="text"
            value={tempInclusion}
            onChange={(e) => setTempInclusion(e.target.value)}
            placeholder="Enter Inclusion"
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={addInclusion}
            className="mt-2 bg-lime-500 text-white px-4 py-2 rounded"
          >
            Add Inclusion
          </button>
        </div>

        {/* Inclusion List */}
        <ul className="mb-3">
          {newAminity.inclusion.map((item, index) => (
            <li
              key={index}
              className="flex justify-between bg-green-100 p-2 rounded mb-1"
            >
              {item}
              <button
                onClick={() => removeInclusion(index)}
                className="text-red-500"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        {/* Exclusion Input */}
        <div className="mb-3">
          <input
            type="text"
            value={tempExclusion}
            onChange={(e) => setTempExclusion(e.target.value)}
            placeholder="Enter Exclusion"
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={addExclusion}
            className="mt-2 bg-pink-500 text-white px-4 py-2 rounded"
          >
            Add Exclusion
          </button>
        </div>

        {/* Exclusion List */}
        <ul className="mb-3">
          {newAminity.exclusion.map((item, index) => (
            <li
              key={index}
              className="flex justify-between bg-red-100 p-2 rounded mb-1"
            >
              {item}
              <button
                onClick={() => removeExclusion(index)}
                className="text-red-500"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Submit Amenity
        </button>
      </form>

      {/* ✅ DISPLAY AMENITIES */}
      {loading ? (
        <div className="text-center mt-10">Loading amenities...</div>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {aminities.map((aminity, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-indigo-700">
                {aminity.AmintiesName}
              </h2>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-green-600">
                  Inclusions:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {aminity.inclusion.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-red-600">
                  Exclusions:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {aminity.exclusion.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddAminities;
