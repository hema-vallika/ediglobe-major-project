import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentsRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import feesRoutes from "./routes/feesRoutes.js";
import uploadRoute from './routes/uploadRoute.js'

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/upload', uploadRoute )

app.use("/api/auth", authRoutes);
app.use("/api/student", studentsRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/fee", feesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(`http://localhost:${PORT}`);
});
