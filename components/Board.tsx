"use client";

import { useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  const tasksByColumn = useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.columnId]) acc[task.columnId] = [];
      acc[task.columnId].push(task);
      return acc;
    }, {} as Record<ColumnId, Task[]>);
  }, [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const targetColumnId = over.id as ColumnId;
    onMoveTask(taskId, targetColumnId);
  };

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="rounded-2xl bg-gray-900/50 border border-white/5
                       min-h-[520px] p-4 animate-pulse"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-gray-700" />
              <div className="h-3 w-20 bg-gray-800 rounded" />
            </div>
            <div className="h-px bg-white/5 mb-4" />
            <div className="flex flex-col gap-2.5">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-800/60" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COLUMNS.map((column) => (
          <ColumnComponent
            key={column.id}
            column={column}
            tasks={tasksByColumn[column.id] ?? []}
            onDelete={onDeleteTask}
            onAddTask={onAddTask}
          />
        ))}
      </div>
    </DndContext>
  );
}