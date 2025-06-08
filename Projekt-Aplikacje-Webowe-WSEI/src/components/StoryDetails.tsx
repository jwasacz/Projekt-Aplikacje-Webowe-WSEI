import React from 'react';
import './StoryDetails.css'; 
import { Story } from '../types/storyModel';

interface Props {
  onClose: () => void;
  story: Story;
  
}

const StoryDetails: React.FC<Props> = ({ onClose, story }) => {
  return (
    <div className='story-details-container-wrapper' >
    <div className="story-details-container">
      <button onClick={onClose}>Zamknij</button>
        <h2>{story.name}</h2>
        <p><strong>Description:</strong> {story.description}</p>
        <p><strong>Priority:</strong> {story.priority}</p>
        <p><strong>Status:</strong> {story.status}</p>
        <p><strong>Data:</strong> {new Date(story.date).toLocaleDateString()}</p>
        <p><strong>Autor ID:</strong> {story.authorId}</p>
        <p><strong>Project ID:</strong> {story.ProjectId}</p>
    </div>
    </div>
  );
};

export default StoryDetails;
