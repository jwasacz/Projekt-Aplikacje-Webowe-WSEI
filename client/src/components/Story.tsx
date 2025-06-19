import React, { useState } from "react";
import "./Story.css";
import { Story, StoryStatus } from "../types/storyModel";
import StoryDetails from "./StoryDetails";

interface StoryProps {
  story: Story;
  updateStatus: (id: string, newStatus: StoryStatus) => void;
}

const StoryComponent: React.FC<StoryProps> = ({ story, updateStatus }) => {
  const formatDate = (date: Date | string) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className="story-card">
        <div className="story-header">
          <span className={`priority-badge ${story.priority.toLowerCase()}`}>
            {story.priority}
          </span>
          <span className="story-date">{formatDate(story.date)}</span>
        </div>
        <h3 className="story-title">{story.name}</h3>
        <p className="story-description">{story.description}</p>
        <div className="story-footer">
          <div className="author-info">
            <div className="author-avatar">
              <span>{story.authorId}</span>
            </div>
            <span className="author-name">Author {story.authorId}</span>
          </div>

          <button
            className="story-details"
            onClick={() => setIsPopupOpen(true)}
          >
            Details
          </button>

          <select
            className="status-select"
            value={story.status}
            onChange={(e) =>
              updateStatus(story._id!, e.target.value as StoryStatus)
            }
          >
            <option value={StoryStatus.ToDo}>To Do</option>
            <option value={StoryStatus.InProgress}>In Progress</option>
            <option value={StoryStatus.Done}>Done</option>
          </select>
        </div>
      </div>

      {isPopupOpen && (
        <div className="modal-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <StoryDetails story={story} onClose={() => setIsPopupOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default StoryComponent;