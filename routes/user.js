import express from "express";
import { register, deleteUser, updateUser, getAllUsers, login, find } from "../controllers/authController.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", authenticate, requireRole("admin"), register);
router.delete("/deleteUser/:id", authenticate, requireRole("admin"), deleteUser);
router.put("/updateUser/:id", authenticate, updateUser);
router.get("/getUsers", authenticate, getAllUsers);
router.get("/find/:id", authenticate, find);

export default router;