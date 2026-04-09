export type ColumnId = "todo" | "inprogress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: ColumnId;
  createdAt: string;
}

export interface Column {
    id: ColumnId;
  title: string;
  color: string;       
  bgColor: string;      
  borderColor: string;
}

export const COLUMNS: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  {
    id: "done",
    title: "Done",
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
  },
];