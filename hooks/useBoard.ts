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


  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks);
    }
  }, [tasks, isLoaded]);

  const addTask = (title: string, description: string, columnId: ColumnId) => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      columnId,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const moveTask = (taskId: string, targetColumnId: ColumnId) => {
    setTasks((prev) =>
      prev.map((t) => t.id === taskId ? { ...t, columnId: targetColumnId } : t)
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return { tasks, isLoaded, addTask, moveTask, deleteTask };
};