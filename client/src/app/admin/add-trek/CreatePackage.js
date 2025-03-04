"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import StateAndCountries from "./StateAndCountries";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AddTrek({ onPackageCreated }) {
  const { admin } = useAdminAuth();

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const initialFormData = {
    countryId: "",
    updatedBy: "",
    stateId: "",
    destinationName: "",
    location: "",
    destinationDescription: "",
    packageName: "",
    days: 0,
    nights: 0,
    cost: 0,
    packageDescription: "",
    itineraries: [],
    packageAminities: "", // Store selected amenity ID
  };

  const [formData, setFormData] = useState(initialFormData);
  const [itinerary, setItinerary] = useState({
    title: "",
    day: 0,
    description: "",
  });
  const [amenities, setAmenities] = useState([]); // Store fetched amenities

  useEffect(() => {
    // Fetch amenities when component mounts
    const fetchAmenities = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}api/inclusoin-exclusion/packageAminties`
        );
        if (response.status === 200) {
          setAmenities(response.data.data); // Store the fetched amenities
        }
      } catch (error) {
        console.error("Error fetching package amenities:", error);
      }
    };
    fetchAmenities();
  }, []);

  const handleStateSelect = (stateId, destinationName, countryId) => {
    setFormData((prevData) => ({
      ...prevData,
      stateId,
      destinationName,
      countryId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: ["days", "nights", "cost"].includes(name)
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleItineraryChange = (e) => {
    const { name, value } = e.target;
    setItinerary({
      ...itinerary,
      [name]: name === "day" ? parseInt(value) || 1 : value,
    });
  };

  const handleAmenityChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      packageAminities: e.target.value, // Store selected amenity ID
    }));
  };

  const addItinerary = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      itineraries: [
        ...prevFormData.itineraries,
        { ...itinerary, day: prevFormData.itineraries.length + 1 },
      ],
    }));
    setItinerary({ title: "", day: 0, description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalFormData = {
        ...formData,
        updatedBy: admin.userId,
      };

      console.log("finalFormData", finalFormData);

      const response = await axios.post(
        `${BASE_URL}api/tours/add-tour`,
        finalFormData
      );
      if (response.status === 200) {
        onPackageCreated(response.data.packageId);
        alert(response.data.message);
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error submitting trek:", error);
    }
  };

  return (
    <div className="flex justify-center bg-indigo-50 mt-10 py-10 px-4">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-center">Add Trek</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <StateAndCountries onStateSelect={handleStateSelect} />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="days"
                value={formData.days || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                placeholder="Days"
                inputMode="numeric"
              />
              <input
                type="number"
                name="nights"
                value={formData.nights || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                placeholder="Nights"
                inputMode="numeric"
              />
              <input
                type="number"
                name="cost"
                value={formData.cost || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                placeholder="Cost ($)"
                inputMode="numeric"
              />
            </div>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="Location"
            />
            <input
              type="text"
              name="packageName"
              value={formData.packageName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="Package Name"
            />
            <textarea
              name="packageDescription"
              value={formData.packageDescription}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="Package Description"
            />
            <textarea
              name="destinationDescription"
              value={formData.destinationDescription}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="Description"
            />

            {/* Package Amenities Dropdown */}
            <select
              name="packageAminities"
              value={formData.packageAminities}
              onChange={handleAmenityChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Package Amenity</option>
              {amenities.map((amenity) => (
                <option key={amenity._id} value={amenity._id}>
                  {amenity.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 border-t pt-4">
            <h3 className="text-md font-semibold mb-2">Add Itinerary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="title"
                value={itinerary.title}
                onChange={handleItineraryChange}
                className="w-full p-2 border rounded"
                placeholder="Day Title"
              />
              <input
                type="hidden"
                name="day"
                value={itinerary.day}
                onChange={handleItineraryChange}
              />
              <button
                type="button"
                onClick={addItinerary}
                className="px-4 py-2 font-semibold bg-indigo-500 text-white rounded hover:bg-indigo-600 w-full md:w-auto"
              >
                Add Day
              </button>
            </div>
            <textarea
              name="description"
              value={itinerary.description}
              onChange={handleItineraryChange}
              className="w-full p-2 border rounded mt-2"
              placeholder="Day Description"
            />
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.itineraries.map((it, index) => (
              <div key={index} className="p-3 border rounded bg-gray-100">
                <p className="font-bold text-indigo-600 overflow-hidden">
                  {it.title} (Day {it.day})
                </p>
                <p className="text-sm">{it.description}</p>
              </div>
            ))}
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto py-2 px-6 font-semibold bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Submit Trek
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
