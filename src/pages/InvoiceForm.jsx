import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    invoiceNumber: "",
    clientName: "",
    date: "",
    amount: "",
    status: "Pending",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/invoices", form);
      toast.success("Invoice created successfully");
      navigate("/");
    } catch {
      toast.error("Failed to create invoice");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-xl shadow space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800 text-center">
          New Invoice
        </h2>

        <input
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Invoice Number"
          required
          onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
        />

        <input
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Client Name"
          required
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
        />

        <input
          type="date"
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
          required
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="number"
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Amount"
          required
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Paid</option>
          <option>Unpaid</option>
          <option>Pending</option>
        </select>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg w-full transition">
          Save Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
