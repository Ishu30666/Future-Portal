import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useAuthStore } from "./Store/useAuthStore";
import { Loader2 } from "lucide-react";
import Navbar from "./Components/Navbar";
import AdminDashboard from "./Pages/AdminDashboard";

const App = () => {
  const { AuthUser, CheckAUth, isCheckingAuth, Theme, getAllFiles } =
    useAuthStore();

  const isAuthenticateduser = !!AuthUser;

  useEffect(() => {
    CheckAUth();
  }, []);

  useEffect(() => {
    if (AuthUser?.isPaid) {
      getAllFiles();
    }
  }, [AuthUser]);

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div data-theme={Theme}>
      <Navbar />

      <Routes>
        {/* Dashboard */}
        <Route
          path="/"
          element={
            isAuthenticateduser ? (
              AuthUser?.isPaid ? (
                <Dashboard />
              ) : (
                <div className="h-screen flex items-center justify-center text-xl">
                  Please make payment to access the dashboard Or Contact to the
                  Administrator
                </div>
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={isAuthenticateduser ? <Navigate to="/" /> : <Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={isAuthenticateduser ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/admin"
          element={
            isAuthenticateduser ? (
              AuthUser.isAdmin ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Login />
            )
          }
        />
      </Routes>

      <footer className="w-full bg-base-200 text-base-content py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Future Portal. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
