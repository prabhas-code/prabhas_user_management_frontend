import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const auth = useAuth(); // ✅ SAFE ACCESS
  const [open, setOpen] = useState(false);

  if (!auth || !auth.user) return null; // ✅ CRITICAL FIX

  const { logout } = auth;

  return (
    <nav className="bg-indigo-600 text-white px-4 sm:px-6 py-4 shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Invoice Management</h1>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/invoice" className="hover:underline">
            Add Invoice
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="sm:hidden">
          {open ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden mt-4 space-y-3">
          <Link to="/" onClick={() => setOpen(false)} className="block">
            Home
          </Link>
          <Link to="/invoice" onClick={() => setOpen(false)} className="block">
            Add Invoice
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
