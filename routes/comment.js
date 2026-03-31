import express from "express";
import { comments } from "../controllers/comment.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id", authenticate, comments);

export default router;