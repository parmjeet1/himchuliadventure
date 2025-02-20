"use client"; // This makes it a client component

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrekProvider } from "@/context/TrekContext";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin"); // Check if it's an admin page

  return (
    <>
      <TrekProvider>
        {!isAdminRoute && <Navbar />} {/* Hide navbar on admin pages */}
        {children}
        {!isAdminRoute && <Footer />} {/* Hide footer on admin pages */}
      </TrekProvider>
    </>
  );
}
