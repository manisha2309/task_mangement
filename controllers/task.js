import Task from "../models/Task.js";
import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

export const createTask = async (req, res) => {
  // requireRole("project_manager") enforced in route
  try {
    const task = await Task.create({
      project_id: req.body.project_id,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      assigned_to: req.body.assigned_to,
      due_date: req.body.due_date,
    });

    await ActivityLog.create({ user_id: req.user.id, action: `Task Created name= ${task.title}` });

    return res.status(201).json({
      message: `Task created. Assigned to user ${task.assigned_to} by ${req.user.name}. Due: ${task.due_date}`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Task could not be created", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  // requireRole("project_manager") enforced in route
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    await ActivityLog.create({ user_id: req.user.id, action: `Task Deleted id= ${req.params.id}` });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  // Allowed for: project_manager OR the user assigned to the task
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isManager = req.user.role === "project_manager";
    const isAssignee = task.assigned_to === req.user.id;

    if (!isManager && !isAssignee) {
      return res.status(403).json({ message: "Access denied" });
    }

    await task.update({
      status: req.body.status,
      assigned_to: req.body.assigned_to,
      due_date: req.body.due_date,
    });

    await ActivityLog.create({ user_id: req.user.id, action: `Task Updated id= ${req.params.id}` });

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error updating task", error: err.message });
  }
};

export const find = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({ data: task });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching task", error: err.message });
  }
};