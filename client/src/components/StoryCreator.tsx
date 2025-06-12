import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoryService from "../services/StroryCreatorService";
import { Story, StoryStatus } from "../types/storyModel";
import StoryComponent from "./Story";
import "./StoryCreator.css";

function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState<Partial<Story>>({});

  useEffect(() => {
    if (projectId) {
      setStories(StoryService.getStoriesByProject(Number(projectId)));
    }
  }, [projectId]);

  const addStory = () => {
    if (!newStory.name || !newStory.description || !newStory.priority) return;

    const newTask: Story = {
      id: Date.now(),
      name: newStory.name!,
      description: newStory.description!,
      priority: newStory.priority!,
      date: new Date(),
      ProjectId: Number(projectId),
      authorId: 1,
      status: StoryStatus.ToDo,
    };

    StoryService.addStory(newTask);
    setStories(StoryService.getStoriesByProject(Number(projectId)));
    setNewStory({});
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
              {
                stories.filter((s) => s.status === StoryStatus.InProgress)
                  .length
              }
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
        {["ToDo", "InProgress", "Done"].map((status) => (
          <div key={status} className="kanban-column">
            <div className="column-header">
              <h2>
                {status === "ToDo"
                  ? "To Do"
                  : status === "InProgress"
                  ? "In Progress"
                  : "Done"}
              </h2>
              <span className="task-count">
                {stories.filter((story) => story.status === status).length}{" "}
                tasks
              </span>
            </div>
            <div className="story-wrapper">
              {stories
                .filter((story) => story.status === status)
                .map((story) => (
                  <StoryComponent
                    key={story.id}
                    story={story}
                    updateStatus={StoryService.updateStoryStatus}
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
