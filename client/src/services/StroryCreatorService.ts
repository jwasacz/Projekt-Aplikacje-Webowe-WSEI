import { Story, StoryStatus } from "../types/storyModel";

const API_URL = "http://localhost:3000";

class StoryService {
  static async getStoriesByProject(projectId: number): Promise<Story[]> {
    const res = await fetch(`${API_URL}/stories/${projectId}`);
    if (!res.ok) throw new Error("Failed to fetch stories");
    return await res.json();
  }

  static async addStory(newStory: Omit<Story, "id" | "status" | "date">): Promise<Story> {
    const res = await fetch(`${API_URL}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStory),
    });
    if (!res.ok) throw new Error("Failed to add story");
    return await res.json();
  }

  static async updateStoryStatus(id: string, newStatus: StoryStatus): Promise<Story> {
    const res = await fetch(`${API_URL}/stories/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return await res.json();
  }
}

export default StoryService;
