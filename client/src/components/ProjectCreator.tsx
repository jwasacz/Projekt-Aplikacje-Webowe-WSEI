import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import ProjectService from "../services/ProjectCreatorService";
import { Project } from "../types/projectModel";

function Crud() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate(); 

  useEffect(() => {
    ProjectService.getProjects().then(setProjects).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const newProject = { name, description };

    try {
      await ProjectService.addProject(newProject);
      const updatedProjects = await ProjectService.getProjects();
      setProjects(updatedProjects);
      setName("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await ProjectService.deleteProject(id);
      const updatedProjects = await ProjectService.getProjects();
      setProjects(updatedProjects);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start bg-gray-900 p-5 text-white min-h-screen w-full font-sans">
      <div className="bg-gray-800 rounded-md p-5 shadow-sm border border-gray-700 mb-5 md:mb-0 md:w-1/3 md:mr-5">
        <h2 className="text-gray-100 text-xl mb-4 font-semibold">Add Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-3 mb-3 border border-gray-600 bg-gray-900 text-white rounded-md text-sm outline-none transition-colors duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-3 border border-gray-600 bg-gray-900 text-white rounded-md text-sm outline-none transition-colors duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button 
            type="submit" 
            className="px-4 py-2 rounded-md font-medium text-sm cursor-pointer transition-all duration-200 border-none bg-green-600 text-white hover:opacity-90 hover:-translate-y-0.5"
          >
            Add
          </button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-md p-5 shadow-sm border border-gray-700 flex-grow">
        <h2 className="text-gray-100 text-xl mb-4 font-semibold">Project list</h2>
        <ul className="list-none p-0">
          {projects.map((proj, index) => (
            <li 
              key={proj._id} 
              className={`flex items-center justify-between p-4 mb-2 bg-gray-900 rounded-md border border-gray-700 ${
                (index + 1) % 2 === 0 || (index + 1) % 3 === 0 ? 'border-l-4 border-l-gray-700' : ''
              }`}
            >
              <span className="font-medium flex-grow mr-2 text-gray-100">
                {proj.name}: {proj.description}
              </span>
              <button
                onClick={() => handleDelete(proj._id!)}
                className="ml-2 px-4 py-2 rounded-md font-medium text-sm cursor-pointer transition-all duration-200 border-none bg-red-600 text-white hover:opacity-90 hover:-translate-y-0.5"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/project/${proj._id}`)}
                className="ml-2 px-4 py-2 rounded-md font-medium text-sm cursor-pointer transition-all duration-200 border-none bg-gray-700 text-gray-300 hover:opacity-90 hover:-translate-y-0.5"
              >
                Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Crud;