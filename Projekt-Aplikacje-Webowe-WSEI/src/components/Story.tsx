import React from "react";
import "./Story.css";
import { Story } from "../types/storyModel"; 

interface StoryProps {
  story: Story;
  updateStatus: (id: number, newStatus: "ToDo" | "InProgress" | "Done") => void;
}

const StoryComponent: React.FC<StoryProps> = ({ story, updateStatus }) => {
  const formatDate = (date: Date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString('pl-PL', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
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
        <select
          className="status-select"
          value={story.status}
          onChange={(e) =>
            updateStatus(
              story.id,
              e.target.value as "ToDo" | "InProgress" | "Done"
            )
          }
        >
          <option value="ToDo">To Do</option>
          <option value="InProgress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default StoryComponent;