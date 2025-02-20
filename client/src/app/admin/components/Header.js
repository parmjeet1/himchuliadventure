"use client";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { FaArrowAltCircleRight, FaLongArrowAltUp } from "react-icons/fa";

export default function Header() {
  const { admin, logout } = useAdminAuth();

  return (
    <header className=" text-black p-4 flex justify-end lg:justify-between items-center">
      <h2 className="hidden lg:flex text-2xl font-mono"> {admin.username} </h2>
      {admin && (
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-full flex items-center justify-between space-x-2"
        >
          <FaArrowAltCircleRight size={16} />
          <span className="font-mono">Logout</span>
        </button>
      )}
    </header>
  );
}
