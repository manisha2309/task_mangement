import { DataTypes, Op } from "sequelize";
import sequelize from "../config/database.js";
import Task from "./Task.js";



export const getOverdueSoonTasks = () => {
  return Task.findAll({
    where: {
      status: { [Op.ne]: "completed" },
      due_date: { [Op.gt]: sequelize.literal("NOW() + INTERVAL 3 DAY") },
    },
  });
};
