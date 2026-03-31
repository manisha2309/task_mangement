import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import ActivityLog from "../models/ActivityLog.js";

export const comments = async (req, res) => {
  
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await Comment.create({
      task_id: task.id,
      user_id: req.user.id,
      comment: req.body.comment,
    });

    await ActivityLog.create({ user_id: req.user.id, action: `User Commented on taskId= ${task.id}` });

    return res.status(201).json({ message: "Comment created" });
  } catch (err) {
    return res.status(500).json({ message: "Error creating comment", error: err.message });
  }
};
