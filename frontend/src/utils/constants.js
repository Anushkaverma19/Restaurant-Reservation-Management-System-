// Backend API URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// User Roles
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

// Reservation Status
export const RESERVATION_STATUS = {
  BOOKED: "Booked",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
};