import mongoose from "mongoose";

export enum StoryStatus {
  ToDo = "todo",
  InProgress = "in_progress",
  Done = "done",
}

const storySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  date: { type: Date, default: Date.now },
  ProjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  authorId: { type: Number, required: true },
  status: { type: String, enum: Object.values(StoryStatus), default: StoryStatus.ToDo },
});

export const StoryModel = mongoose.model("Story", storySchema);
