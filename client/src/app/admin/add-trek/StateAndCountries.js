"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function StateAndCountries({ onStateSelect }) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { admin } = useAdminAuth();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  const [newCountry, setNewCountry] = useState("");
  const [newState, setNewState] = useState("");
  const [newDestination, setNewDestination] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        console.log(`${BASE_URL}api/admin/country/${admin.userId}`);
        const response = await axios.get(
          `${BASE_URL}api/admin/country/${admin.userId}`
        );
        if (response.status === 200) {
          setCountries(response.data.country);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setSelectedState("");
      setDestinations([]);
      setSelectedDestination("");
      return;
    }
    fetchStates();
  }, [selectedCountry]);

  const fetchStates = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}api/admin/state/${selectedCountry}`
      );
      if (response.status === 200) {
        setStates(response.data.states);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    if (!selectedState) {
      setDestinations([]);
      setSelectedDestination("");
      return;
    }
    fetchDestinations();
  }, [selectedState]);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}api/admin/destination/statewise/${selectedState}`
      );
      if (response.status === 200) {
        setDestinations(response.data.destinations);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedDestination("");
    onStateSelect(stateId, "");
  };

  const handleDestinationChange = (e) => {
    const destinationName = e.target.value;
    setSelectedDestination(destinationName);
    onStateSelect(selectedState, destinationName, selectedCountry);
    console.log(
      "this is what i am sending",
      selectedState,
      destinationName,
      selectedCountry
    );
  };

  const handleAddCountry = async () => {
    if (newCountry.trim() === "") return;

    try {
      const response = await axios.post(
        `${BASE_URL}api/admin/country/add-country`,
        {
          name: newCountry,
          updatedBy: admin.userId,
        }
      );
      console.log(response.data);
      setSelectedCountry(response.data.name._id);
    } catch (error) {
      console.log("error while adding country", error);
    }

    setCountries([...countries, { _id: newCountry, name: newCountry }]);
    setNewCountry(""); // Reset input
  };

  const handleAddState = async () => {
    if (newState.trim() === "" || !selectedCountry) return;

    try {
      const response = await axios.post(
        `${BASE_URL}api/admin/state/add-state`,
        {
          countryId: selectedCountry,
          name: newState,
          updatedBy: admin.userId,
        }
      );
      setSelectedState(response.data.state._id);
    } catch (error) {
      console.log("error while adding state", error);
    }

    setStates([...states, { _id: newState, name: newState }]);
    setNewState(""); // Reset input
  };

  const handleAddDestination = async () => {
    if (newDestination.trim() === "" || !selectedState) return;

    try {
      const response = await axios.post(
        `${BASE_URL}api/admin/destination/add-destination`,
        {
          countryId: selectedCountry,
          stateId: selectedState,
          name: newDestination,
          description: "newDestination.trim()",
          location: "newDestination",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("error while adding destination", error);
    }

    setDestinations([
      ...destinations,
      { _id: newDestination, name: newDestination },
    ]);
    setNewDestination(""); // Reset input
  };

  return (
    <div className="p-4 max-w-md mx-auto md:max-w-lg space-y-4">
      <div>
        <label className="block text-sm font-medium">Select Country</label>
        <select
          className="p-2 border border-neutral-500 rounded w-full"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {/* Add New Country */}
      <div>
        <input
          type="text"
          placeholder="Add Country"
          className="p-2 border border-neutral-500 rounded w-full"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
        />
        <button
          onClick={handleAddCountry}
          className="mt-2 w-full bg-indigo-500 text-white p-2 rounded"
        >
          Add Country
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium">Select State</label>
        <select
          className="p-2 border border-neutral-500 rounded w-full"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select a state
          </option>
          {states.map((state) => (
            <option key={state._id} value={state._id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add New State */}
      <div>
        <input
          type="text"
          placeholder="Add State"
          className="p-2 border border-neutral-500 rounded w-full"
          value={newState}
          onChange={(e) => setNewState(e.target.value)}
          disabled={!selectedCountry}
        />
        <button
          onClick={handleAddState}
          className="mt-2 w-full bg-indigo-500 text-white p-2 rounded"
        >
          Add State
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium">Select Destination</label>
        <select
          className="p-2 border border-neutral-500 rounded w-full"
          value={selectedDestination}
          onChange={handleDestinationChange}
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select a destination
          </option>
          {destinations.map((destination) => (
            <option key={destination._id} value={destination.name}>
              {destination.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add New Destination */}
      <div>
        <input
          type="text"
          placeholder="Add Destination"
          className="p-2 border border-neutral-500 rounded w-full"
          value={newDestination}
          onChange={(e) => setNewDestination(e.target.value)}
          disabled={!selectedState}
        />
        <button
          onClick={handleAddDestination}
          className="mt-2 w-full bg-indigo-500 text-white p-2 rounded"
        >
          Add Destination
        </button>
      </div>
    </div>
  );
}
