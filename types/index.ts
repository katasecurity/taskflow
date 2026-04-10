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
  classes: {
    dot: string;
    text: string;
    border: string;
  };
}

export const COLUMNS: Column[] = [
  {
    id: "todo",
    title: "To Do",
    classes: {
      dot:    "bg-blue-500",
      text:   "text-blue-400",
      border: "border-blue-500/40",
    },
  },
  {
    id: "inprogress",
    title: "In Progress",
    classes: {
      dot:    "bg-amber-500",
      text:   "text-amber-400",
      border: "border-amber-500/40",
    },
  },
  {
    id: "done",
    title: "Done",
    classes: {
      dot:    "bg-emerald-500",
      text:   "text-emerald-400",
      border: "border-emerald-500/40",
    },
  },
];