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
  accentColor: string;
}

export const COLUMNS: Column[] = [
  { id: "todo",       title: "To Do",       accentColor: "blue"    },
  { id: "inprogress", title: "In Progress", accentColor: "amber"   },
  { id: "done",       title: "Done",        accentColor: "emerald" },
];