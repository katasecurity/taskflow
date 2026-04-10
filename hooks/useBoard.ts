"use client";

import { useState, useEffect } from "react";
import { Task, ColumnId } from "@/types";
import { loadTasks, saveTasks } from "@/lib/localStorage";

export const useBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
    setIsLoaded(true);
  }, []);

  const addTask = (title: string, description: string, columnId: ColumnId) => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      columnId,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => {
      const updated = [...prev, newTask];
      saveTasks(updated);
      return updated;
    });
  };

  const moveTask = (taskId: string, targetColumnId: ColumnId) => {
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === taskId ? { ...t, columnId: targetColumnId } : t
      );
      saveTasks(updated);
      return updated;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== taskId);
      saveTasks(updated);
      return updated;
    });
  };

  return { tasks, addTask, moveTask, deleteTask, isLoaded };
};