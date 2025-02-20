"use client";
import { useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import axios from "axios";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}api/admin/login`, {
        email: username,
        password,
      });
      if (response.status === 201) {
        const token = response.data.token;
        login({ username, token });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300 px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-md shadow-md"
      >
        <h2 className="text-xl text-secondary font-mono font-bold mb-4">
          Admin Login - HIMCHULI
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border placeholder:text-gray-600 p-2 w-full mb-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border placeholder:text-gray-600 p-2 w-full mb-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-primary rounded-full font-mono font-semibold text-white p-2 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
