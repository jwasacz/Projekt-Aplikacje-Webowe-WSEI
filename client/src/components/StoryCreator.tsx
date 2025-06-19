import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoryService from "../services/StroryCreatorService";
import { Story, StoryStatus } from "../types/storyModel";
import StoryComponent from "./Story";
import "./StoryCreator.css";

// Typ dla nowego story - zgodny z tym czego oczekuje service
type NewStoryType = Omit<Story, "_id" | "date" | "status">;

function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState<Partial<Story>>({});

  useEffect(() => {
    async function fetchStories() {
      if (projectId) {
        try {
          const data = await StoryService.getStoriesByProject(Number(projectId));
          setStories(data);
        } catch (e) {
          console.error(e);
        }
      }
    }
    fetchStories();
  }, [projectId]);

  const addStory = async () => {
    if (!newStory.name || !newStory.description || !newStory.priority || !projectId) return;

    try {
      const newTask: NewStoryType = {
        name: newStory.name,
        description: newStory.description,
        priority: newStory.priority,
        ProjectId: projectId, // Już nie undefined bo sprawdzamy wyżej
        authorId: 1,
      };
      const added = await StoryService.addStory(newTask);
      setStories((prev) => [...prev, added]);
      setNewStory({});
    } catch (e) {
      console.error(e);
    }
  };

  const updateStatus = async (id: string, newStatus: StoryStatus) => {
    try {
      const updated = await StoryService.updateStoryStatus(id, newStatus);
      setStories((prev) =>
        prev.map((story) => (story._id === id ? updated : story))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const statusMap: { [key: string]: StoryStatus } = {
    ToDo: StoryStatus.ToDo,
    InProgress: StoryStatus.InProgress,
    Done: StoryStatus.Done,
  };

  return (
    <div className="project-details-container">
    <div className="project-details-header">
      <h1>Project {projectId} Details</h1>
      <div className="project-stats">
        <div className="stat-item">
          <span className="stat-value">
            {stories.filter((s) => s.status === StoryStatus.ToDo).length}
          </span>
          <span className="stat-label">To Do</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            {stories.filter((s) => s.status === StoryStatus.InProgress).length}
          </span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            {stories.filter((s) => s.status === StoryStatus.Done).length}
          </span>
          <span className="stat-label">Done</span>
        </div>
      </div>
    </div>

    <div className="add-story-form">
      <h2>Add New Story</h2>
      <div className="form-inputs">
        <input
          type="text"
          placeholder="Task Name"
          value={newStory.name || ""}
          onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
          className="story-input"
        />
        <input
          type="text"
          placeholder="Description"
          value={newStory.description || ""}
          onChange={(e) =>
            setNewStory({ ...newStory, description: e.target.value })
          }
          className="story-input"
        />
        <select
          value={newStory.priority || ""}
          onChange={(e) =>
            setNewStory({ ...newStory, priority: e.target.value })
          }
          className="story-select"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addStory} className="add-story-button">
          Add new Story
        </button>
      </div>
    </div>

    <div className="kanban-board">
      {["ToDo", "InProgress", "Done"].map((statusKey) => (
        <div key={statusKey} className="kanban-column">
          <div className="column-header">
            <h2>
              {statusKey === "ToDo"
                ? "To Do"
                : statusKey === "InProgress"
                ? "In Progress"
                : "Done"}
            </h2>
            <span className="task-count">
              {
                stories.filter(
                  (story) => story.status === statusMap[statusKey]
                ).length
              }{" "}
              tasks
            </span>
          </div>
          <div className="story-wrapper">
            {stories
              .filter((story) => story.status === statusMap[statusKey])
              .map((story) => (
                <StoryComponent
                  key={story._id}
                  story={story}
                  updateStatus={updateStatus}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default ProjectDetails;