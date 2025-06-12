import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import ProjectService from "../services/ProjectCreatorService";
import { Project } from "../types/projectModel";
import "./ProjectCreator.css";

function Crud() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate(); 

  useEffect(() => {
    setProjects(ProjectService.getProject());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const newProject: Project = {
      id: Date.now(),
      name,
      description,
    };

    ProjectService.addProject(newProject);
    setProjects(ProjectService.getProject());
    setName("");
    setDescription("");
  };

  const handleDelete = (id: number) => {
    ProjectService.deleteProject(id);
    setProjects(ProjectService.getProject());
  };

  return (
    <div className="crud-container">
      <div className="crud-form">
        <h2>Dodaj projekt</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="crud-input"
            placeholder="Nazwa projektu"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="crud-input"
            placeholder="Opis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="crud-button add">
            Dodaj
          </button>
        </form>
      </div>

      <div className="crud-list">
        <h2>Lista projektów</h2>
        <ul>
          {projects.map((proj) => (
            <li key={proj.id} className="crud-item">
              <span className="crud-item-text">
                {proj.name}: {proj.description}
              </span>
              <button
                onClick={() => handleDelete(proj.id)}
                className="crud-button delete"
              >
                Usuń
              </button>
              <button
                onClick={() => navigate(`/project/${proj.id}`)}
                className="crud-button"
              >
                Szczegóły
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Crud;
