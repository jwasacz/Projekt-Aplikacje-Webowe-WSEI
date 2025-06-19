export interface Story {
  _id?: string;
  name: string;
  description: string;
  priority: string;
  date: Date | string;
  ProjectId: string | number;
  authorId: number;
  status: StoryStatus;    
}

export enum StoryStatus {
  ToDo = "todo",
  InProgress = "in_progress",
  Done = "done"
}
