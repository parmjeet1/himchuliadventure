"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const [admin, setAdmin] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this runs only on the client

    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  useEffect(() => {
    if (!isClient) return; // Ensure it runs only on the client

    if (admin && pathname === "/admin/login") {
      router.push("/admin"); // Redirect logged-in admin away from login page
    }

    if (!admin && pathname !== "/admin/login") {
      router.push("/admin/login"); // Redirect non-logged-in users to login
    }
  }, [admin, pathname, isClient]);

  const login = (adminData) => {
    if (!adminData) return;
    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdmin(adminData);
    router.push("/admin");
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    router.push("/admin/login");
  };

  if (!isClient) return null; // Prevents hydration mismatch

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
