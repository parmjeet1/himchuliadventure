"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaHome, FaUsers, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: <FaHome size={20} /> },
    { name: "Manage Users", href: "/admin/users", icon: <FaUsers size={20} /> },
    { name: "Settings", href: "/admin/settings", icon: <FaCog size={20} /> },
  ];

  return (
    <>
      {/* Hamburger Button (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-3 fixed top-4 left-4 z-40"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar (Mobile & Desktop) */}
      <aside
        className={`fixed lg:static left-0 top-0 w-64 h-screen bg-white shadow-lg p-6 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-600"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link.href} className="mb-2">
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    pathname === link.href
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setIsOpen(false)} // Close menu on click (mobile)
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay (Closes Sidebar When Clicked Outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
