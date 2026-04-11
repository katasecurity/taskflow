import { create } from "zustand";
import { Task, ColumnId } from "@/types";
import { loadTasks, saveTasks } from "@/lib/localStorage";

interface BoardStore {
  tasks: Task[];
  isLoaded: boolean;
  loadBoard: () => void;
  addTask: (title: string, description: string, columnId: ColumnId) => void;
  moveTask: (taskId: string, columnId: ColumnId) => void;
  reorderTask: (taskId: string, overId: string, columnId: ColumnId) => void;
  deleteTask: (taskId: string) => void;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  tasks: [],
  isLoaded: false,

  loadBoard: () => {
    set({ tasks: loadTasks(), isLoaded: true });
  },

  addTask: (title, description, columnId) => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      columnId,
      createdAt: new Date().toISOString(),
    };
    const updated = [...get().tasks, newTask];
    saveTasks(updated);
    set({ tasks: updated });
  },

  moveTask: (taskId, columnId) => {
    const updated = get().tasks.map((t) =>
      t.id === taskId ? { ...t, columnId } : t
    );
    saveTasks(updated);
    set({ tasks: updated });
  },


  reorderTask: (taskId, overId, columnId) => {
    const tasks = get().tasks;
    const oldIndex = tasks.findIndex((t) => t.id === taskId);
    const newIndex = tasks.findIndex((t) => t.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const updated = [...tasks];
    const [moved] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, { ...moved, columnId });
    saveTasks(updated);
    set({ tasks: updated });
  },

  deleteTask: (taskId) => {
    const updated = get().tasks.filter((t) => t.id !== taskId);
    saveTasks(updated);
    set({ tasks: updated });
  },
}));