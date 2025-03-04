"use client";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <ProtectedAdminLayout>{children}</ProtectedAdminLayout>
    </AdminAuthProvider>
  );
}

function ProtectedAdminLayout({ children }) {
  const { admin } = useAdminAuth();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Get pathname safely (avoiding hydration issues)
  const pathname = typeof window !== "undefined" ? usePathname() : "/";

  // Allow access to the login page without redirection
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (admin === undefined) return; // Avoid redirecting before auth state is known

    if (!admin && !isLoginPage) {
      router.replace("/admin/login"); // Redirect unauthorized users
    }

    setIsAuthChecked(true);
  }, [admin, router, isLoginPage]);

  // Show nothing until auth state is determined
  if (!isAuthChecked) return null;

  return isLoginPage ? (
    <main className="flex-1">{children}</main>
  ) : (
    <div className="flex h-screen bg-gray-100 overflow-y-auto">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
