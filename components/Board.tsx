"use client";

import { useRef, useMemo } from "react";
import { ColumnId, COLUMNS, Task } from "@/types";
import ColumnComponent from "./Column";

interface BoardProps {
  tasks: Task[];
  isLoaded: boolean;
  onMoveTask: (taskId: string, columnId: ColumnId) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: (columnId: ColumnId) => void;
}

export default function Board({
  tasks, isLoaded, onMoveTask, onDeleteTask, onAddTask,
}: BoardProps) {
  const draggedTaskId = useRef<string | null>(null);

  const tasksByColumn = useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.columnId]) acc[task.columnId] = [];
      acc[task.columnId].push(task);
      return acc;
    }, {} as Record<ColumnId, Task[]>);
  }, [tasks]);

  const handleDragStart = (taskId: string) => {
    draggedTaskId.current = taskId;
  };

  const handleDrop = (targetColumnId: ColumnId) => {
    if (!draggedTaskId.current) return;
    onMoveTask(draggedTaskId.current, targetColumnId);
    draggedTaskId.current = null;
  };

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="rounded-2xl bg-gray-900/50 border border-white/5 p-4 min-h-[520px] animate-pulse"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${col.accent} opacity-50`} />
              <div className="h-3 w-20 bg-gray-800 rounded" />
            </div>
            <div className="h-px bg-white/5 mb-4" />
            <div className="flex flex-col gap-2.5">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-800/60 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {COLUMNS.map((column) => (
        <ColumnComponent
          key={column.id}
          column={column}
          tasks={tasksByColumn[column.id] || []}
          onDelete={onDeleteTask}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
}