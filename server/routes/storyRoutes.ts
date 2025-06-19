import express from "express";
import { getStoriesByProject, addStory, updateStoryStatus } from "../controllers/storyController";

const router = express.Router();

router.get("/stories/:projectId", getStoriesByProject);
router.post("/stories", addStory);
router.patch("/stories/:id/status", updateStoryStatus);

export default router;
