import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async (pageNumber) => {
    try {
      const res = await api.get(`/admin/users?page=${pageNumber}`);
      setUsers(res.data);
    } catch (error) {
      console.error(
        "Fetch users failed:",
        error.response?.data || error.message
      );
    }
  };

  const toggleStatus = async (id, status) => {
    if (status === "active") {
      await api.patch(`/admin/users/${id}/deactivate`);
    } else {
      await api.patch(`/admin/users/${id}/activate`);
    }
    fetchUsers(page);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">User Management</h2>

        {/* USERS TABLE */}
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No users found
                </td>
              </tr>
            )}

            {users.map((u) => (
              <tr key={u._id} className="text-center">
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border capitalize">{u.role}</td>
                <td className="p-2 border capitalize">{u.status}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => toggleStatus(u._id, u.status)}
                    className={`px-3 py-1 rounded text-white ${
                      u.status === "active"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {u.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION CONTROLS */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>

          <span className="font-medium">Page {page}</span>

          <button
            disabled={users.length < 10}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded ${
              users.length < 10
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
