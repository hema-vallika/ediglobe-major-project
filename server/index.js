import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import connectDB from "./config/db.js";   
import authRoutes from "./routes/authRoutes.js";
import studentsRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth",authRoutes)


app.use("/api/students",studentsRoutes);

app.use("/api/teachers",teacherRoutes);

app.use("/api/courses",courseRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);

  
});