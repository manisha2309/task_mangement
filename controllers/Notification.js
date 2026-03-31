import { getOverdueSoonTasks } from "../models/Notification.js";

export const create = async (req, res) => {
  try {
    const alerts = await getOverdueSoonTasks();
    return res.status(200).json({ alerts });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching notifications", error: err.message });
  }
};