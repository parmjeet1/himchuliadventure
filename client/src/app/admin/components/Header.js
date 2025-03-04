"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiTag,
  FiArrowDownLeft,
} from "react-icons/fi";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useRouter } from "next/navigation";
import { FaHiking } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Home");

  const { admin, logout } = useAdminAuth();
  const router = useRouter();

  // Handle Logout
  const handleLogout = () => {
    logout(); // Calls logout function
    router.replace("/admin/login"); // Redirects to login page
  };

  return (
    <motion.nav
      layout
      className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-300 p-3 z-50"
    >
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Logo />
          <motion.span
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-lg font-semibold"
          >
            {admin?.username}
          </motion.span>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex gap-6">
          {navItems.map(({ title, Icon }) =>
            title === "Logout" ? (
              <LogoutButton
                key={title}
                handleLogout={handleLogout}
                Icon={Icon}
              />
            ) : (
              <NavItem
                key={title}
                Icon={Icon}
                title={title}
                selected={selected}
                setSelected={setSelected}
              />
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-xl">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden flex flex-col gap-2 mt-3"
        >
          {navItems.map(({ title, Icon }) =>
            title === "Logout" ? (
              <LogoutButton
                key={title}
                handleLogout={handleLogout}
                Icon={Icon}
              />
            ) : (
              <NavItem
                key={title}
                Icon={Icon}
                title={title}
                selected={selected}
                setSelected={setSelected}
              />
            )
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

// Navigation Item Component
const NavItem = ({ Icon, title, selected, setSelected }) => {
  const router = useRouter();

  const handleClick = () => {
    setSelected(title);
    if (title === "Home") {
      router.push("/admin"); // Redirects to admin dashboard
    } else if (title === "Add Trek") {
      router.push("/admin/add-trek");
    }
  };

  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      <Icon className="text-lg" />
      <span className="text-sm font-medium">{title}</span>
    </motion.button>
  );
};

// Logout Button Component
const LogoutButton = ({ handleLogout, Icon }) => (
  <motion.button
    layout
    onClick={handleLogout}
    className="flex items-center gap-2 px-4 py-2 rounded-md text-red-600 hover:bg-red-100 transition-colors"
  >
    <Icon className="text-lg" />
    <span className="text-sm font-medium">Logout</span>
  </motion.button>
);

// Logo Component
const Logo = () => (
  <motion.div
    layout
    className="grid size-10 place-content-center rounded-md bg-indigo-600"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-white"
    >
      <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
      <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
    </svg>
  </motion.div>
);

// Navigation Items Array
const navItems = [
  { title: "Home", Icon: FiHome },
  { title: "Add Trek", Icon: FaHiking },
  { title: "Products", Icon: FiShoppingCart },
  { title: "Members", Icon: FiUsers },
  { title: "Tags", Icon: FiTag },
  { title: "Logout", Icon: FiArrowDownLeft },
];

export default Navbar;
