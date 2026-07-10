import Reservation from "../models/Reservation.js";
import { assignTable } from "../services/reservation.service.js";
import Table from "../models/Table.js";


// ===============================
// GET ALL TABLES
// GET /api/admin/tables
// ===============================

export const getTables = async (req, res) => {
  try {

    const tables = await Table.find()
      .sort({ tableNumber: 1 });


    res.json({
      success: true,
      tables,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// ===============================
// GET ALL RESERVATIONS
// GET /api/admin/reservations
// GET /api/admin/reservations?date=2026-07-20
// ===============================

export const getReservations = async (req, res) => {

  try {

    const filter = {};


    if (req.query.date) {

      const start = new Date(req.query.date);
      start.setHours(0,0,0,0);


      const end = new Date(req.query.date);
      end.setHours(23,59,59,999);


      filter.reservationDate = {
        $gte:start,
        $lte:end,
      };

    }



    const reservations = await Reservation.find(filter)

      .populate(
        "user",
        "name email"
      )

      .populate(
        "table",
        "tableNumber capacity"
      )

      .sort({
        reservationDate:-1,
        startTime:1,
      });



    res.json({
      success:true,
      count:reservations.length,
      reservations,
    });



  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};




// ===============================
// UPDATE RESERVATION
// PUT /api/admin/reservations/:id
// ===============================

export const updateReservation = async(req,res)=>{

 try{


  const reservation =
  await Reservation.findById(req.params.id);



  if(!reservation){

    return res.status(404).json({
      success:false,
      message:"Reservation not found",
    });

  }



  const {
    reservationDate,
    startTime,
    endTime,
    guests,
    status
  } = req.body;



  // Only update status
  // Complete / Cancel button

  if(status){

    reservation.status = status;

    await reservation.save();


    return res.json({
      success:true,
      message:"Reservation status updated",
      reservation,
    });

  }



  // Update booking details

  const table = await assignTable(
    reservationDate,
    startTime,
    endTime,
    Number(guests)
  );



  if(!table){

    return res.status(409).json({
      success:false,
      message:"No available table",
    });

  }



  reservation.reservationDate =
    reservationDate;


  reservation.startTime =
    startTime;


  reservation.endTime =
    endTime;


  reservation.guests =
    guests;


  reservation.table =
    table._id;



  await reservation.save();



  await reservation.populate([
    {
      path:"user",
      select:"name email",
    },
    {
      path:"table",
      select:"tableNumber capacity",
    }
  ]);



  res.json({

    success:true,
    message:"Reservation updated successfully",
    reservation,

  });



 }catch(error){

  res.status(500).json({
    success:false,
    message:error.message,
  });

 }

};




// ===============================
// CANCEL RESERVATION
// DELETE /api/admin/reservations/:id
// ===============================

export const deleteReservation = async(req,res)=>{

 try{


  const reservation =
  await Reservation.findById(req.params.id);



  if(!reservation){

    return res.status(404).json({
      success:false,
      message:"Reservation not found",
    });

  }



  reservation.status="Cancelled";


  await reservation.save();



  res.json({

    success:true,
    message:"Reservation cancelled successfully",

  });



 }catch(error){

  res.status(500).json({

    success:false,
    message:error.message,

  });

 }

};