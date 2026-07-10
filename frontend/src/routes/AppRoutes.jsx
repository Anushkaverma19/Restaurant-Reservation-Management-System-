import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import UserDashboard from "../pages/user/Dashboard";
import CreateReservation from "../pages/user/CreateReservation";
import MyReservations from "../pages/user/MyReservations";

import AdminDashboard from "../pages/admin/Dashboard";
import Reservations from "../pages/admin/Reservations";
import ManageTables from "../pages/admin/ManageTables";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* User Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-reservation"
        element={
          <ProtectedRoute role="user">
            <CreateReservation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-reservations"
        element={
          <ProtectedRoute role="user">
            <MyReservations />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reservations"
        element={
          <ProtectedRoute role="admin">
            <Reservations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tables"
        element={
          <ProtectedRoute role="admin">
            <ManageTables />
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;