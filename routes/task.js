import express from "express";
import { createTask, deleteTask, find, updateTask } from "../controllers/task.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/createTask", authenticate, requireRole("project_manager"), createTask);
router.delete("/deleteTask/:id", authenticate, requireRole("project_manager"), deleteTask);
router.put("/updateTask/:id", authenticate, updateTask);
router.get("/find/:id", authenticate, find);

export default router;