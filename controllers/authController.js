import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";
import jwt from "jsonwebtoken";

const SECRET = "secretkey";

export const register = async (req, res) => {
  // Only admins may register users (enforced by requireRole in route)
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    await ActivityLog.create({ user_id: req.user.id, action: `User Registered: ${user.name}` });

    return res.status(201).json({ message: "User registered", userId: user.id });
  } catch (err) {
    return res.status(500).json({ message: "Error creating user", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "User not found" });

    await ActivityLog.create({ user_id: req.user.id, action: `User Deleted: ${req.params.id}` });

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      },
      { where: { id: req.params.id } }
    );

    if (!updated) return res.status(404).json({ message: "User not found" });

    await ActivityLog.create({ user_id: req.user.id, action: `User Updated: ${req.body.name}` });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email, password: req.body.password },
    });

    if (!user) return res.status(404).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      SECRET,
      { expiresIn: "7d" }
    );

    await ActivityLog.create({ user_id: user.id, action: "User Login" });

    return res.status(200).json({ message: "LOGIN SUCCESSFUL", name: user.name, token });
  } catch (err) {
    return res.status(500).json({ message: "Login error", error: err.message });
  }
};

export const find = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User fetched", data: user });
  } catch (err) {
    return res.status(500).json({ message: "Error finding user", error: err.message });
  }
};