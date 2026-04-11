import { create } from "zustand";
import { persist } from "zustand/middleware";
import { arrayMove } from "@dnd-kit/sortable";
import { Task, ColumnId } from "@/types";

interface BoardStore {
  tasks: Task[];
  isLoaded: boolean;
  setLoaded: () => void;
  addTask: (title: string, description: string, columnId: ColumnId) => void;
  moveTask: (taskId: string, columnId: ColumnId) => void;
  reorderTask: (taskId: string, overId: string, columnId: ColumnId) => void;
  deleteTask: (taskId: string) => void;
}

export const useBoardStore = create<BoardStore>()(
  
  persist(
    (set, get) => ({
      tasks: [],
      isLoaded: false,

      setLoaded: () => set({ isLoaded: true }),

      addTask: (title, description, columnId) => {
        if (!title.trim()) return;
        const newTask: Task = {
          id: crypto.randomUUID(),
          title: title.trim(),
          description: description.trim(),
          columnId,
          createdAt: new Date().toISOString(),
        };
        set({ tasks: [...get().tasks, newTask] });
      },

      moveTask: (taskId, columnId) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === taskId ? { ...t, columnId } : t
          ),
        });
      },

      
      reorderTask: (taskId, overId, columnId) => {
        const tasks = get().tasks;
        const oldIndex = tasks.findIndex((t) => t.id === taskId);
        const newIndex = tasks.findIndex((t) => t.id === overId);
        if (oldIndex === -1 || newIndex === -1) return;

        const reordered = arrayMove(tasks, oldIndex, newIndex);
        
        const updated = reordered.map((t) =>
          t.id === taskId ? { ...t, columnId } : t
        );
        set({ tasks: updated });
      },

      deleteTask: (taskId) => {
        set({ tasks: get().tasks.filter((t) => t.id !== taskId) });
      },
    }),
    {
      name: "taskflow-tasks",
      
      onRehydrateStorage: () => (state) => {
        state?.setLoaded();
      },
    }
  )
);