import React from 'react';
import { Story } from '../types/storyModel';
import { getPriorityClass, getStatusClass } from '../utils/helpers';

interface Props {
  onClose: () => void;
  story: Story;
}

const StoryDetails: React.FC<Props> = ({ onClose, story }) => {

  return (
    <div className='fixed top-0 left-0 bg-black/38 w-screen h-screen flex justify-center items-center z-50'>
      <div className="w-11/12 max-w-3xl bg-gray-900 border border-gray-700 rounded-lg p-8 text-gray-100 shadow-2xl relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 bg-transparent border border-gray-700 text-gray-100 py-2 px-4 rounded-md text-sm cursor-pointer transition-colors duration-200 hover:bg-gray-800"
        >
          Close
        </button>
        
        <h2 className="mt-0 text-2xl mb-6 text-blue-400 font-semibold">{story.name}</h2>
        
        <div className="space-y-4">
          <p className="text-base text-gray-300">
            <strong className="text-gray-400 inline-block min-w-28 font-medium">Description:</strong> 
            {story.description}
          </p>
          
          <p className="text-base text-gray-300">
            <strong className="text-gray-400 inline-block min-w-28 font-medium">Priority:</strong> 
            <span className={`inline-block py-1 px-3 rounded-full text-sm font-medium ml-2 ${getPriorityClass(story.priority)}`}>
              {story.priority}
            </span>
          </p>
          
          <p className="text-base text-gray-300">
            <strong className="text-gray-400 inline-block min-w-28 font-medium">Status:</strong> 
            <span className={`inline-block py-1 px-3 rounded-full text-sm font-medium ml-2 ${getStatusClass(story.status)}`}>
              {story.status}
            </span>
          </p>
          
          <p className="text-base text-gray-300">
            <strong className="text-gray-400 inline-block min-w-28 font-medium">Data:</strong> 
            {new Date(story.date).toLocaleDateString('pl-PL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          
          <p className="text-base text-gray-300">
            <strong className="text-gray-400 inline-block min-w-28 font-medium">Autor ID:</strong> 
            <span className="inline-block w-8 h-8 rounded-full bg-gray-700 text-gray-100 text-center leading-8 text-sm font-medium ml-2">
              {story.authorId}
            </span>
          </p>
          
          <p className="text-base text-gray-300">
            <strong className="text-gray-400 inline-block min-w-28 font-medium">Project ID:</strong> 
            <span className="font-mono text-blue-400 ml-2">{story.ProjectId}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
