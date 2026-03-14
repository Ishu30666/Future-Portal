import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";

const Register = () => {
  const { Register } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    Register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center ">
      <div className="bg-base-300 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-500 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Admith"
              value={formData.username}
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formData.email}
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500  transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500  transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white font-semibold rounded-sm hover:opacity-90 transition-all"
          >
            <div className="flex items-center justify-center">
              Create Account
            </div>
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
