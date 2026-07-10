import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createReservation,
  getMyReservations,
  cancelReservation,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createReservation);

router.get("/my", getMyReservations);

router.delete("/:id", cancelReservation);

export default router;