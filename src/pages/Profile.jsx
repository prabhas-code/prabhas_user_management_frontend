import React from "react";
import { useState, useEffect } from "react";
import api from "../api/axios";
import useAuth from "../auth/useAuth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Sync UI with user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");
        setFullName(res.data.fullName);
        setEmail(res.data.email);
      } catch {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      await api.put("/users/me", { fullName, email });
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    try {
      await api.put("/users/me/password", {
        oldPassword,
        newPassword,
      });
      toast.success("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
    } catch {
      toast.error("Failed to change password");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>

        {/* READ-ONLY INFO */}
        <div className="mb-6 space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-medium">Role:</span>{" "}
            <span className="capitalize">{user.role}</span>
          </p>
        </div>

        {/* UPDATE PROFILE */}
        <h3 className="font-semibold mb-2">Profile Information</h3>
        <div className="space-y-3 mb-6">
          <input
            className="w-full border p-2 rounded"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={updateProfile}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </div>

        {/* CHANGE PASSWORD */}
        <h3 className="font-semibold mb-2">Change Password</h3>
        <div className="space-y-3">
          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            onClick={changePassword}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
