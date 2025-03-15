import {Project} from "../models/projectModel"


class ProjectService{

    //Pobieranie projektu
    static getProject():Project[]{
        return JSON.parse(localStorage.getItem("projects") || "[]")
    }

    static addProject(project: Project): void {
        const projects = this.getProject();
        projects.push(project);
        localStorage.setItem("projects", JSON.stringify(projects));
    }


    static deleteProject(id: number): void {
        const projects = this.getProject().filter((proj) => proj.id !== id);
        localStorage.setItem("projects", JSON.stringify(projects));
    }

}


export default ProjectService