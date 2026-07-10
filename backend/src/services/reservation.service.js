import Table from "../models/Table.js";
import Reservation from "../models/Reservation.js";

/**
 * Convert "18:30" into minutes
 */
const toMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Check time overlap
 */
const isOverlapping = (
  newStart,
  newEnd,
  existingStart,
  existingEnd
) => {
  return (
    toMinutes(newStart) < toMinutes(existingEnd) &&
    toMinutes(newEnd) > toMinutes(existingStart)
  );
};


/**
 * Assign available table
 */
export const assignTable = async (
  reservationDate,
  startTime,
  endTime,
  guests
) => {

  // Find tables according to guest capacity
  const candidateTables = await Table.find({
    capacity: { $gte: guests },
    isActive: true,
  });


  console.log("Guests:", guests);
  console.log("Candidate Tables:", candidateTables);


  // Check every table availability
  for (const table of candidateTables) {

    const existingReservations = await Reservation.find({
      table: table._id,
      reservationDate,
      status: { $ne: "Cancelled" },
    });


    let available = true;


    for (const reservation of existingReservations) {

      const overlap = isOverlapping(
        startTime,
        endTime,
        reservation.startTime,
        reservation.endTime
      );


      if (overlap) {
        available = false;
        break;
      }
    }


    // Return first available table
    if (available) {
      return table;
    }
  }


  // No table available
  return null;
};