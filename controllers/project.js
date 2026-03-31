import Project from "../models/Project.js";
import ActivityLog from "../models/ActivityLog.js";

export const createProject = async (req, res) => {
 
  try {
    const existing = await Project.findOne({ where: { project_name: req.body.name } });
    if (existing) return res.status(400).json({ message: "Project already exists!" });

    const project = await Project.create({
      project_name: req.body.name,
      description: req.body.description,
      created_by: req.user.id,
    });

    await ActivityLog.create({ user_id: req.user.id, action: `Project Created name= ${project.project_name}` });

    return res.status(201).json({ message: "Project created successfully", projectId: project.id });
  } catch (err) {
    return res.status(500).json({ message: "Error creating project", error: err.message });
  }
};

export const getAllProjects = async (req, res) => {
  // requireRole("admin") enforced in route
  try {
    const projects = await Project.findAll();
    return res.status(200).json({
      message: `Successfully fetched all data. Requested by Admin ${req.user.name}`,
      data: projects,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
};

export const deleteProjects = async (req, res) => {
 
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Project not found" });

    await ActivityLog.create({ user_id: req.user.id, action: `Project Deleted id= ${req.params.id}` });

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting project", error: err.message });
  }
};
