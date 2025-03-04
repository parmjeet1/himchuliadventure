import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TrekContext = createContext();

export const TrekProvider = ({ children }) => {
  const [treks, setTreks] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const CACHE_KEY = "treks";
  const EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

  // Function to fetch treks from API
  const fetchTreks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/package/`);

      const newData = response.data.packages;
      setTreks(newData);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: newData, timestamp: Date.now() })
      ); // Store with timestamp
    } catch (error) {
      console.error("Error fetching trek data:", error);
    }
  };

  // Function to check if cached data is still valid
  const isCacheValid = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (!cachedData) return false; // No cache found

    try {
      const { timestamp } = JSON.parse(cachedData);
      return Date.now() - timestamp < EXPIRY_TIME;
    } catch (error) {
      return false; // In case JSON parsing fails
    }
  };

  // Load treks from cache or API
  useEffect(() => {
    if (isCacheValid()) {
      const cachedTreks = JSON.parse(localStorage.getItem(CACHE_KEY));
      setTreks(cachedTreks.data);
    } else {
      fetchTreks();
    }
  }, []);

  // Function to manually refresh trek data (e.g., after admin update)
  const refreshTreks = () => {
    fetchTreks(); // Force refetch
  };

  return (
    <TrekContext.Provider value={{ treks, refreshTreks }}>
      {children}
    </TrekContext.Provider>
  );
};

// Custom hook for consuming trek data
export const useTreks = () => {
  return useContext(TrekContext);
};
