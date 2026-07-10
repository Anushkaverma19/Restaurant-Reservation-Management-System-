import mongoose from "mongoose";
import dotenv from "dotenv";
import Table from "../models/Table.js";

dotenv.config();

const seedTables = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    // Remove old tables (optional)
    await Table.deleteMany();

    const tables = [
      {
        tableNumber: 1,
        capacity: 2,
        isActive: true,
      },
      {
        tableNumber: 2,
        capacity: 4,
        isActive: true,
      },
      {
        tableNumber: 3,
        capacity: 6,
        isActive: true,
      },
      {
        tableNumber: 4,
        capacity: 8,
        isActive: true,
      }
    ];

    await Table.insertMany(tables);

    console.log("Dummy tables added successfully");

    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedTables();