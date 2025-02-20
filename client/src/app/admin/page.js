import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Manage your application settings.</p>
      <ul className="space-y-3">
        <li>
          <Link href="/admin/users" className="text-blue-500 hover:underline">
            Manage Users
          </Link>
        </li>
        <li>
          <Link
            href="/admin/settings"
            className="text-blue-500 hover:underline"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
