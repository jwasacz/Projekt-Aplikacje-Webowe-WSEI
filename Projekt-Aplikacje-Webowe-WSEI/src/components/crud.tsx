import { useState, useEffect } from "react";
import ProjectService from "../services/crudService";
import { Project } from "../models/projectModel";

function Crud() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        setProjects(ProjectService.getProject());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;

        const newProject: Project = {
            id: Date.now(),
            name,
            description
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
        <div>
            <h2>Lista projektów</h2>
            <ul>
                {projects.map((proj) => (
                    <li key={proj.id}>
                        {proj.name}: {proj.description}
                        <button onClick={() => handleDelete(proj.id)}>Usuń</button>
                    </li>
                ))}
            </ul>

            <h2>Dodaj projekt</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nazwa projektu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Opis"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Dodaj</button>
            </form>
        </div>
    );
}

export default Crud;
