export interface Task {
  id: string;
  goalId: string;
  order: number;
  title: string;
  description: string;
  tips: string[];
  completedAt: string | null;
}