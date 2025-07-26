import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import connectDB from "./config/db.js";   
import authRoutes from "./routes/authRoutes.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth",authRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});