export interface TaskItem {
  id: number;
  description: string;
  status: boolean;
  created_at: Date;
  updated_at?: Date;
}
