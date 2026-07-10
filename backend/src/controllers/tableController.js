import Table from "../models/Table.js";
import Reservation from "../models/Reservation.js";

// GET ALL TABLES
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADD TABLE
export const createTable = async (req, res) => {
  try {

    console.log("BODY:", req.body);

    const { tableNumber, capacity } = req.body;


    const table = await Table.create({
      tableNumber,
      capacity
    });


    res.status(201).json(table);


  } catch (error) {

    console.log("TABLE ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }
};

// UPDATE TABLE
export const updateTable = async (req,res)=>{
  try {

    const table = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.json(table);

  } catch(error){
    res.status(500).json({message:error.message});
  }
};


// CHANGE ACTIVE STATUS
export const toggleTable = async(req,res)=>{
  try{

    const table = await Table.findById(req.params.id);

    table.isActive = !table.isActive;

    await table.save();

    res.json(table);

  }catch(error){
    res.status(500).json({message:error.message});
  }
};


// DELETE TABLE
export const deleteTable = async(req,res)=>{
  try{

    const reservations = await Reservation.find({
      table:req.params.id,
      status:"Booked"
    });


    if(reservations.length > 0){
      return res.status(400).json({
        message:"Table has active reservations"
      });
    }


    await Table.findByIdAndDelete(req.params.id);

    res.json({
      message:"Table deleted"
    });


  }catch(error){
    res.status(500).json({message:error.message});
  }
};