import { Story } from "../types/storyModel"; 

class StoryService {
  static getStoriesByProject(projectId: number): Story[] {
    return JSON.parse(localStorage.getItem("stories") || "[]").filter(
      (s: Story) => s.ProjectId === projectId
    );
  }

  static addStory(newStory: Story): void {
    const stories = JSON.parse(localStorage.getItem("stories") || "[]");
    stories.push(newStory);
    localStorage.setItem("stories", JSON.stringify(stories));
  }

  static updateStoryStatus(
    id: number,
    newStatus: "ToDo" | "InProgress" | "Done"
  ): void {
    const stories = JSON.parse(localStorage.getItem("stories") || "[]").map(
      (s: Story) => (s.id === id ? { ...s, status: newStatus } : s)
    );
    localStorage.setItem("stories", JSON.stringify(stories));
  }
}

export default StoryService;
