import Reservation from "../models/Reservation.js";
import { assignTable } from "../services/reservation.service.js";

/**
 * Create Reservation
 * POST /api/reservations
 */
export const createReservation = async (req, res) => {
  try {
    const {
      reservationDate,
      startTime,
      endTime,
      guests,
    } = req.body;

    if (
      !reservationDate ||
      !startTime ||
      !endTime ||
      !guests
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (Number(guests) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Guests must be greater than zero",
      });
    }

    const table = await assignTable(
      reservationDate,
      startTime,
      endTime,
      Number(guests)
    );

    if (!table) {
      return res.status(409).json({
        success: false,
        message: "No table available for the selected slot",
      });
    }

    const reservation = await Reservation.create({
      user: req.user.id,
      table: table._id,
      reservationDate,
      startTime,
      endTime,
      guests,
    });

    await reservation.populate([
      { path: "table", select: "tableNumber capacity" },
      { path: "user", select: "name email" },
    ]);

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Logged-in User Reservations
 * GET /api/reservations/my
 */
export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user: req.user.id,
    })
      .populate("table", "tableNumber capacity")
      .sort({
        reservationDate: -1,
        startTime: 1,
      });

    res.json({
      success: true,
      count: reservations.length,
      reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Cancel Reservation
 * DELETE /api/reservations/:id
 */
export const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    reservation.status = "Cancelled";

    await reservation.save();

    res.json({
      success: true,
      message: "Reservation cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};