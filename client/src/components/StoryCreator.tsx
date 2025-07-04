import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoryService from "../services/StroryCreatorService";
import { Story, StoryStatus } from "../types/storyModel";
import StoryComponent from "./Story";

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
        ProjectId: projectId,
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

  const deleteStory = async (id: string) => {
    try {
      await StoryService.deleteStory(id);
      setStories((prev) => prev.filter((story) => story._id !== id));
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
    <div className="p-5 bg-gray-900 min-h-screen w-full font-sans text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5 gap-4">
        <h1 className="text-gray-100 text-2xl font-semibold">Project {projectId} Details</h1>
        <div className="flex gap-5">
          <div className="flex flex-col items-center bg-gray-800 py-2 px-5 rounded-md shadow-sm border border-gray-700">
            <span className="text-xl font-semibold text-blue-400">
              {stories.filter((s) => s.status === StoryStatus.ToDo).length}
            </span>
            <span className="text-xs text-gray-400">To Do</span>
          </div>
          <div className="flex flex-col items-center bg-gray-800 py-2 px-5 rounded-md shadow-sm border border-gray-700">
            <span className="text-xl font-semibold text-blue-400">
              {stories.filter((s) => s.status === StoryStatus.InProgress).length}
            </span>
            <span className="text-xs text-gray-400">In Progress</span>
          </div>
          <div className="flex flex-col items-center bg-gray-800 py-2 px-5 rounded-md shadow-sm border border-gray-700">
            <span className="text-xl font-semibold text-blue-400">
              {stories.filter((s) => s.status === StoryStatus.Done).length}
            </span>
            <span className="text-xs text-gray-400">Done</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-5 mb-5 shadow-sm border border-gray-700">
        <h2 className="text-gray-100 text-lg mb-4 font-semibold">Add New Story</h2>
        <div className="flex flex-col md:flex-row flex-wrap gap-2">
          <input
            type="text"
            placeholder="Task Name"
            value={newStory.name || ""}
            onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
            className="flex-1 min-w-48 p-3 border border-gray-600 bg-gray-900 text-white rounded-md text-sm outline-none transition-colors duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20"
          />
          <input
            type="text"
            placeholder="Description"
            value={newStory.description || ""}
            onChange={(e) =>
              setNewStory({ ...newStory, description: e.target.value })
            }
            className="flex-1 min-w-48 p-3 border border-gray-600 bg-gray-900 text-white rounded-md text-sm outline-none transition-colors duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20"
          />
          <select
            value={newStory.priority || ""}
            onChange={(e) =>
              setNewStory({ ...newStory, priority: e.target.value })
            }
            className="flex-1 min-w-48 p-3 border border-gray-600 bg-gray-900 text-white rounded-md text-sm outline-none transition-colors duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button 
            onClick={addStory} 
            className="py-3 px-5 bg-green-600 text-white border-none rounded-md font-medium cursor-pointer transition-all duration-200 hover:bg-green-700 hover:-translate-y-0.5"
          >
            Add new Story
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {["ToDo", "InProgress", "Done"].map((statusKey) => (
          <div key={statusKey} className="bg-gray-800 rounded-md p-4 shadow-sm border border-gray-700">
            <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
              <h2 className="text-gray-100 text-base font-semibold m-0">
                {statusKey === "ToDo"
                  ? "To Do"
                  : statusKey === "InProgress"
                  ? "In Progress"
                  : "Done"}
              </h2>
              <span className="text-xs text-gray-400 bg-gray-700 py-1 px-2 rounded-xl">
                {
                  stories.filter(
                    (story) => story.status === statusMap[statusKey]
                  ).length
                }{" "}
                tasks
              </span>
            </div>
            <div className="min-h-52">
              {stories
                .filter((story) => story.status === statusMap[statusKey])
                .map((story) => (
                  <StoryComponent
                    key={story._id}
                    story={story}
                    updateStatus={updateStatus}
                    deleteStory={deleteStory}  
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
