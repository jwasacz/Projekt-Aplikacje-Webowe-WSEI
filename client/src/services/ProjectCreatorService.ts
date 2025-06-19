import { Project } from "../types/projectModel";

const BASE_URL = "http://localhost:3000/projects";

class ProjectService {
  static async getProjects(): Promise<Project[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Nie udało się pobrać projektów");
    return res.json();
  }

  static async addProject(project: Omit<Project, "_id">): Promise<void> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Nie udało się dodać projektu");
  }

  static async deleteProject(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Nie udało się usunąć projektu");
  }
}

export default ProjectService;
