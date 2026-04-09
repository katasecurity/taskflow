"use client";

import { useState, useEffect } from "react";
import { Task, ColumnId } from "@/types";
import { loadTasks, saveTasks } from "@/lib/localStorage";

export const useBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

 
  const updateTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    saveTasks(newTasks);
  };


  const addTask = (
    title: string,
    description: string,
    columnId: ColumnId
  ): void => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      columnId,
      createdAt: new Date().toISOString(),
    };
    updateTasks([...tasks, newTask]);
  };


  const moveTask = (taskId: string, targetColumnId: ColumnId): void => {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, columnId: targetColumnId } : task
    );
    updateTasks(updated);
  };


  const deleteTask = (taskId: string): void => {
    updateTasks(tasks.filter((task) => task.id !== taskId));
  };

  return { tasks, addTask, moveTask, deleteTask };
};