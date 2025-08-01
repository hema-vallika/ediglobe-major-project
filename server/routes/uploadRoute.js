import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";
import dotenv from 'dotenv'
const router = Router();
import protect from "../middleware/authMiddleware.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});



// using this API should require authentication
router.get("/signature", function (req, res, next) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: "Ediglobe",
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    signature,
    timestamp,
    cloudname: process.env.CLOUDINARY_CLOUD_NAME,
    apikey: process.env.CLOUDINARY_API_KEY,
  });
});

router.post("/delete-image", async (req, res) => {
  const { publicId } = req.body;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true, 
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete image" });
  }
});

export default router;
