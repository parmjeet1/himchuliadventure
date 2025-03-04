"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/customer/fetch`);
        if (response.data.status === "success") {
          setUsers(response.data.data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [BASE_URL]);

  const toggleSolved = async (userId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.patch(`${BASE_URL}api/customer/update/${userId}`, {
        solved: updatedStatus,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, solved: updatedStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating solved status:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-600">
          Loading users...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <div className="container  mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Users</h2>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Mobile</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">Message</th>
              <th className="border border-gray-300 p-2 text-left">
                Package ID
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Created At
              </th>
              <th className="border border-gray-300 p-2 text-left">Solved</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.mobile}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.message}</td>
                <td className="border border-gray-300 p-2">
                  {user.packageId || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className={`px-3 py-1 text-sm font-semibold rounded-lg transition-all ${
                      user.solved
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                    onClick={() => toggleSolved(user._id, user.solved)}
                  >
                    {user.solved ? "Solved" : "Unsolved"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card-style layout for mobile */}
      <div className="md:hidden space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="border border-gray-300 p-4 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600">
                <strong>Mobile:</strong> {user.mobile}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Message:</strong> {user.message}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Package ID:</strong> {user.packageId || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Created At:</strong>{" "}
                {new Date(user.createdAt).toLocaleString()}
              </p>
              <button
                className={`mt-2 px-3 py-1 text-sm font-semibold rounded-lg transition-all ${
                  user.solved
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                onClick={() => toggleSolved(user._id, user.solved)}
              >
                {user.solved ? "Solved" : "Unsolved"}
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 text-lg">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}
