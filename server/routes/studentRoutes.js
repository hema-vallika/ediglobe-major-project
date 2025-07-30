import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudent); // POST /api/students
router.get("/", getAllStudents);    // GET /api/students
router.get("/:id", getStudentById); // GET /api/students/:id
router.put("/:id", updateStudent); // PUT /api/students/:id
router.delete("/:id", deleteStudent); // DELETE /api/students/:id

export default router;
