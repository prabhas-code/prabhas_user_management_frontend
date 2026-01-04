import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientName: "",
    date: "",
    amount: "",
    status: "Pending",
  });

  /* ---------------- FETCH INVOICES ---------------- */
  const fetchInvoices = async () => {
    try {
      const res = await api.get("/invoices");
      setInvoices(res.data);
    } catch {
      toast.error("Failed to fetch invoices");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  /* ---------------- FILTER + SORT ---------------- */
  const filteredInvoices = invoices
    .filter((inv) =>
      statusFilter === "All" ? true : inv.status === statusFilter
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(a.date) - new Date(b.date);
    });

  /* ---------------- OPEN EDIT ---------------- */
  const openEdit = (invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName,
      date: invoice.date?.substring(0, 10),
      amount: invoice.amount,
      status: invoice.status,
    });
  };

  /* ---------------- UPDATE ---------------- */
  const updateInvoice = async () => {
    try {
      await api.put(`/invoices/${editingInvoice._id}`, formData);
      toast.success("Invoice updated");
      setEditingInvoice(null);
      fetchInvoices();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">My Invoices</h2>

      {/* ---------------- FILTER BAR ---------------- */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          className="border p-2 rounded w-full sm:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Unpaid">Unpaid</option>
        </select>

        <select
          className="border p-2 rounded w-full sm:w-48"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* ---------------- INVOICE GRID ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvoices.map((inv) => (
          <div
            key={inv._id}
            className="relative bg-white p-6 rounded-xl shadow hover:shadow-md transition space-y-3"
          >
            {/* EDIT ICON */}
            <button
              onClick={() => openEdit(inv)}
              className="absolute top-3 right-3 text-gray-400 hover:text-indigo-600"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>

            <h3 className="font-semibold text-lg">{inv.invoiceNumber}</h3>

            <p className="text-sm text-gray-600">
              Client: <span className="font-medium">{inv.clientName}</span>
            </p>

            <p className="text-sm text-gray-600">
              Date: {new Date(inv.date).toLocaleDateString()}
            </p>

            <p className="text-sm">
              Amount: <span className="font-semibold">₹{inv.amount}</span>
            </p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                inv.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : inv.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {inv.status}
            </span>
          </div>
        ))}
      </div>

      {/* ---------------- EDIT MODAL ---------------- */}
      {editingInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-4">Edit Invoice</h3>

            <div className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                value={formData.invoiceNumber}
                onChange={(e) =>
                  setFormData({ ...formData, invoiceNumber: e.target.value })
                }
              />
              <input
                className="w-full border p-2 rounded"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
              <select
                className="w-full border p-2 rounded"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option>Paid</option>
                <option>Pending</option>
                <option>Unpaid</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingInvoice(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateInvoice}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
