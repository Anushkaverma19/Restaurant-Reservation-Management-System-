import express from "express";
import {
 getTables,
 createTable,
 updateTable,
 toggleTable,
 deleteTable
} from "../controllers/tableController.js";


const router = express.Router();


router.get("/",getTables);

router.post("/",createTable);

router.put("/:id",updateTable);

router.patch("/:id/status",toggleTable);

router.delete("/:id",deleteTable);


export default router;