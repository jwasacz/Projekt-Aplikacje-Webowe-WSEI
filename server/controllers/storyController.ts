import { Request, Response } from "express";
import { StoryModel, StoryStatus } from "../models/story.model";

export const getStoriesByProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const stories = await StoryModel.find({ ProjectId: projectId });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: "Błąd pobierania historyjek" });
  }
};

export const addStory = async (req: Request, res: Response) => {
  try {
    const { name, description, priority, ProjectId, authorId } = req.body;
    const newStory = new StoryModel({
      name,
      description,
      priority,
      ProjectId,
      authorId,
      status: StoryStatus.ToDo,
      date: new Date(),
    });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ error: "Błąd zapisywania historyjki" });
  }
};

export const updateStoryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(StoryStatus).includes(status)) {
      return res.status(400).json({ error: "Nieprawidłowy status" });
    }

    const updatedStory = await StoryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedStory) {
      return res.status(404).json({ error: "Nie znaleziono historyjki" });
    }

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ error: "Błąd aktualizacji statusu" });
  }
};
