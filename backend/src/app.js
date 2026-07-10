
import authRoutes from "./routes/auth.routes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import reservationRoutes from "./routes/reservation.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import tableRoutes from "./routes/tableRoutes.js";



dotenv.config();

const app = express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Restaurant Reservation API Running"
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reservations", reservationRoutes);

app.use("/api/tables", tableRoutes);
export default app;