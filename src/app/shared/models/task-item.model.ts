export interface TaskItem {
  id: number;
  title: string;
  description: string;
  status: boolean;
  created_at: Date;
  updated_at?: Date;
}
