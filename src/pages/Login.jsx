import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../auth/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", form);
    login(res.data.token, res.data.user);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full border p-3 rounded-lg"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
