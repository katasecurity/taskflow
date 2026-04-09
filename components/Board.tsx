"use client";

import { useRef } from "react";
import { ColumnId, COLUMNS } from "@/types";
import { useBoard } from "@/hooks/useBoard";
import ColumnComponent from "./Column";


export default function Board() {
  const { tasks, addTask, moveTask, deleteTask } = useBoard();


  const draggedTaskId = useRef<string | null>(null);

  const handleDragStart = (taskId: string) => {
    draggedTaskId.current = taskId;
  };

  const handleDrop = (targetColumnId: ColumnId) => {
    if (!draggedTaskId.current) return;
    moveTask(draggedTaskId.current, targetColumnId);
    draggedTaskId.current = null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {COLUMNS.map((column) => (
        <ColumnComponent
          key={column.id}
          column={column}
        
          tasks={tasks.filter((task) => task.columnId === column.id)}
          onDelete={deleteTask}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}