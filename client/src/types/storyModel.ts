export interface Story {
    id: number;
    name: string;
    description: string;
    priority: string;
    date: Date;
    ProjectId: number;
    authorId: number;
    status: StoryStatus;    
  }

  export enum StoryStatus{
    ToDo= "todo",
    InProgress= "in_progress",
    Done="done"
  }
  

