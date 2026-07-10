import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  getReservations,
  updateReservation,
  deleteReservation,
  getTables,
} from "../controllers/admin.controller.js";


const router = express.Router();


// Admin authentication + authorization

router.use(authMiddleware);
router.use(roleMiddleware("admin"));


// Reservation management

router.get(
  "/reservations",
  getReservations
);


router.put(
  "/reservations/:id",
  updateReservation
);


router.delete(
  "/reservations/:id",
  deleteReservation
);


// Table management

router.get(
  "/tables",
  getTables
);


export default router;