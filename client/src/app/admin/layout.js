"use client";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
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
  const pathname = usePathname();

  // Allow access to the login page without redirection
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!admin && !isLoginPage) {
      router.push("/admin/login"); // Redirect unauthorized users
    }
  }, [admin, router, isLoginPage]);

  // Prevent layout from flashing before redirect (except login page)
  if (!admin && !isLoginPage) return null;

  return isLoginPage ? (
    <main className="flex-1">{children}</main>
  ) : (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
