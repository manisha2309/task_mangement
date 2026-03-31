import express from "express";
import { create } from "../controllers/Notification.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, create);

export default router;