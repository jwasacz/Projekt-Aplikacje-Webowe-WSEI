export interface Story {
    id: number;
    name: string;
    description: string;
    priority: string;
    date: Date;
    ProjectId: number;
    authorId: number;
    status: "ToDo" | "InProgress" | "Done";
  }
  