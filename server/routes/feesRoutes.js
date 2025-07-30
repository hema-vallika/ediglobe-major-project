import express from "express"
import {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee,
} from "../controllers/feesController.js"

const router = express.Router()

router.post("/", createFee)
router.get("/", getAllFees)
router.get("/:id", getFeeById)
router.put("/:id", updateFee)
router.delete("/:id", deleteFee)

export default router
