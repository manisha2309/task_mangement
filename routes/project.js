import express from "express";
import { createProject, deleteProjects, getAllProjects } from "../controllers/project.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/createProject", authenticate, requireRole("admin"), createProject);
router.get("/getProjects", authenticate, requireRole("admin"), getAllProjects);
router.delete("/delete/:id", authenticate, requireRole("admin"), deleteProjects);

export default router;