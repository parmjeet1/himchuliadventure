import {
  FaUsers,
  FaHiking,
  FaMountain,
  FaBinoculars,
  FaPhotoVideo,
  FaGlobeAsia,
} from "react-icons/fa";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-4 mt-14 font-mono">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-6">Manage your application settings.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/user-queries"
          className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex items-center space-x-4"
        >
          <FaUsers className="text-indigo-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold text-neutral-500">
              Manage Users
            </h2>
            <p className="text-gray-500 mt-1">
              View and manage registered users.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/gallery"
          className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex items-center space-x-4"
        >
          <FaPhotoVideo className="text-indigo-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold text-neutral-500">Gallery</h2>
            <p className="text-gray-500 mt-1">
              Adjust gallery to make everything beautiful.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/add-trek"
          className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex items-center space-x-4"
        >
          <FaHiking className="text-indigo-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold text-neutral-500">
              Create New Trek
            </h2>
            <p className="text-gray-500 mt-1">Add and manage trek packages.</p>
          </div>
        </Link>
        <Link
          href="/admin/add-country"
          className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex items-center space-x-4"
        >
          <FaGlobeAsia className="text-indigo-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold text-neutral-500">
              Add a new country.
            </h2>
            <p className="text-gray-500 mt-1">Add and manage countries.</p>
          </div>
        </Link>
        <Link
          href="/admin/all-treks"
          className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex items-center space-x-4"
        >
          <FaMountain className="text-indigo-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold text-neutral-500">
              Available Treks.
            </h2>
            <p className="text-gray-500 mt-1">Edit active and current treks.</p>
          </div>
        </Link>
        <Link
          href="/admin/add-packageAminities"
          className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex items-center space-x-4"
        >
          <FaBinoculars className="text-indigo-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold text-neutral-500">
              Add new inclusions and exclusions.
            </h2>
            <p className="text-gray-500 mt-1">
              Add new inclusions and exclusions.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
