import { Request, Response } from "express";
import { ProjectModel } from "../models/project.model";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectModel.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Błąd pobierania projektów" });
  }
};

export const addProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newProject = new ProjectModel({ name, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Błąd zapisywania projektu" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProjectModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Błąd usuwania projektu" });
  }
};