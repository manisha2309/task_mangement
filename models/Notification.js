import { DataTypes, Op } from "sequelize";
import sequelize from "../config/database.js";
import Task from "./Task.js";

// This model is not a stored table — it's a helper that queries Task directly.
// Kept as a named export for consistency with the rest of the codebase.

export const getOverdueSoonTasks = () => {
  return Task.findAll({
    where: {
      status: { [Op.ne]: "completed" },
      due_date: { [Op.gt]: sequelize.literal("NOW() + INTERVAL 3 DAY") },
    },
  });
};