import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";

const Login = () => {
  const { Login } = useAuthStore();
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    Login(formData);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center ">
      <div className="bg-base-300 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-amber-300 text-white font-semibold rounded-sm hover:opacity-90 transition-all"
          >
            <div className="flex items-center justify-center">Login</div>
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
