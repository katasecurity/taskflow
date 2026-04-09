import { Task } from "@/types";

const STORAGE_KEY = "taskflow-tasks";


export const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {

    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};