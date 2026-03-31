import express from "express";
import sequelize from "./config/database.js";

// Import models so Sequelize registers them before sync
import "./models/User.js";
import "./models/Project.js";
import "./models/Task.js";
import "./models/Comment.js";
import "./models/ActivityLog.js";
import "./models/Notification.js";

import userRoutes from "./routes/user.js";
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/task.js";
import commentRoutes from "./routes/comment.js";
import notificationRoutes from "./routes/notification.js";

const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);
app.use("/comment", commentRoutes);
app.use("/alert", notificationRoutes);

// Sync all models to the database, then start the server
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });