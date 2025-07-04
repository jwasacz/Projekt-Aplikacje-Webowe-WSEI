import { StoryStatus } from "../types/storyModel";

export const getPriorityClasses = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-600 text-white';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'low':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  export const getCardBorderClass = (status: StoryStatus) => {
      switch (status) {
        case StoryStatus.ToDo:
          return "border-l-blue-400";
        case StoryStatus.InProgress:
          return "border-l-orange-500";
        case StoryStatus.Done:
          return "border-l-green-600";
        default:
          return "border-l-blue-400";
      }
    };

  export const getStatusClass = (status: StoryStatus) => {
    switch (status) {
      case StoryStatus.ToDo:
        return 'bg-blue-600 text-white';
      case StoryStatus.InProgress:
        return 'bg-orange-500 text-white';
      case StoryStatus.Done:
        return 'bg-green-600 text-white';
      default:
        return '';
    }
  };


    export const getPriorityClass = (priority: string) => {
    const p = priority.toLowerCase();
    if (p === 'high') return 'bg-red-600 text-white';
    if (p === 'medium') return 'bg-orange-500 text-white';
    return 'bg-green-600 text-white';
  };

