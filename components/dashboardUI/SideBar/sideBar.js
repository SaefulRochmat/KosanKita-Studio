// app/components/dashboardUI/SideBar/sideBar.js
"use client";

import Link from "next/link";
import {
  FiMenu,
  FiLogOut,
  FiUser,
  FiHome,
  FiUpload,
  FiFolder,
} from "react-icons/fi";
import useSideBar from "@/hooks/useSideBar";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const { isOpen, toggleSidebar } = useSideBar();
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    }
    router.push("/login"); // redirect ke login setelah logout
  };

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Upload File", icon: <FiUpload />, path: "/dashboard/upload-form" },
    { name: "Uploaded File", icon: <FiFolder />, path: "/dashboard/uploaded-form" },
  ];

  return (
    <div className="flex">
      {/* ============== NAVBAR (Tablet & Mobile) ============== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 py-3 z-50 shadow-md">
        <div className="text-lg font-bold">Kosan Studio</div>
        <button
          onClick={toggleSidebar}
          className="p-2 text-2xl bg-gray-800 rounded-md"
        >
          <FiMenu />
        </button>
      </div>

      {/* Overlay menu mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Drawer menu untuk mobile */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} lg:hidden`}
      >
        <div className="flex items-center justify-center py-6 text-2xl font-bold border-b border-green-700">
          Menu
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={toggleSidebar}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-700 p-4 space-y-3">
          <Link
            href="/user"
            onClick={toggleSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FiUser className="text-xl" />
            <span>User</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600 transition"
          >
            <FiLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ============== SIDEBAR (Desktop & Laptop) ============== */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-900 text-white h-full">
        <div className="flex items-center justify-center py-6 text-2xl font-bold border-b border-green-700">
          Kosan Studio
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-700 p-4 space-y-3">
          <Link
            href="/user"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FiUser className="text-xl" />
            <span>User</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600 transition"
          >
            <FiLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
