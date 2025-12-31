import React from "react";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  // 🔒 If user not logged in, don't render navbar
  if (!user) return null;

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-semibold text-lg">User Management</h1>

      <div className="flex gap-4 items-center">
        {/* ✅ Guarded admin link */}
        {user.role === "admin" && (
          <Link to="/admin" className="hover:underline">
            Users
          </Link>
        )}
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
