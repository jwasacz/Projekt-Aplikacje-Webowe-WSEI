import React, { useState } from "react";
import { Story, StoryStatus } from "../types/storyModel";
import StoryDetails from "./StoryDetails";
import { getCardBorderClass, getPriorityClasses } from "../utils/helpers";

interface StoryProps {
  story: Story;
  updateStatus: (id: string, newStatus: StoryStatus) => void;
  deleteStory: (id: string) => void;   
}

const StoryComponent: React.FC<StoryProps> = ({ story, updateStatus, deleteStory }) => {
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
      <div
        className={`bg-gray-900 rounded-md p-4 mb-4 shadow-sm border border-gray-700 border-l-4 ${getCardBorderClass(
          story.status
        )} transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg`}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            className={`inline-block py-1 px-2 rounded-xl text-xs font-medium ${getPriorityClasses(
              story.priority
            )}`}
          >
            {story.priority}
          </span>
          <span className="text-xs text-gray-400">
            {formatDate(story.date)}
          </span>
        </div>

        <h3 className="m-0 mb-2 text-base font-semibold text-gray-100">
          {story.name}
        </h3>
        <p className="m-0 mb-4 text-sm text-gray-300 leading-relaxed">
          {story.description}
        </p>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-gray-700 text-gray-100 flex items-center justify-center text-xs font-medium mr-2">
              <span>{story.authorId}</span>
            </div>
            <span className="text-xs text-gray-400">
              Author {story.authorId}
            </span>
          </div>

          <button
            className="border border-gray-600 text-xs text-white bg-gray-700 rounded-md py-1 px-8 hover:bg-gray-600 transition-colors duration-200"
            onClick={() => setIsPopupOpen(true)}
          >
            Details
          </button>

          <select
            className="py-1 px-2 rounded-md border border-gray-600 bg-gray-700 text-xs text-gray-100 cursor-pointer outline-none transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20"
            value={story.status}
            onChange={(e) =>
              updateStatus(story._id!, e.target.value as StoryStatus)
            }
          >
            <option value={StoryStatus.ToDo}>To Do</option>
            <option value={StoryStatus.InProgress}>In Progress</option>
            <option value={StoryStatus.Done}>Done</option>
          </select>

          <button
            className="ml-3 py-1 px-4 bg-red-600 rounded-md text-xs font-semibold text-white hover:bg-red-700 transition-colors duration-200"
            onClick={() => deleteStory(story._id!)}
          >
            Delete
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-6 max-w-2xl max-h-96 overflow-auto m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <StoryDetails story={story} onClose={() => setIsPopupOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default StoryComponent;
