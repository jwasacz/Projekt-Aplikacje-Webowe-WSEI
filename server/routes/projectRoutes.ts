import express from "express";
import { getAllProjects, addProject, deleteProject } from "../controllers/projectController";

const router = express.Router();

router.get("/projects", getAllProjects);
router.post("/projects", addProject);
router.delete("/projects/:id", deleteProject);

export default router;