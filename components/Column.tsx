"use client";

import { useDroppable } from "@dnd-kit/core";
import { Column, Task, ColumnId } from "@/types";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: Column;
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onAddTask: (columnId: ColumnId) => void;
}

export default function ColumnComponent({
  column, tasks, onDelete, onAddTask,
}: ColumnProps) {
  const { dot, text, border } = column.classes;

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col rounded-2xl p-4 min-h-[520px]
        bg-gray-900/50 border transition-all duration-200
        ${isOver ? `${border} shadow-lg scale-[1.01]` : "border-white/5"}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${dot}`} />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {column.title}
          </h2>
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md bg-white/5 ${text}`}>
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className="w-6 h-6 rounded-lg flex items-center justify-center
                     text-gray-500 hover:text-gray-200 hover:bg-white/10
                     transition-all duration-150 text-lg leading-none active:scale-90"
        >
          +
        </button>
      </div>

      <div className="h-px bg-white/5 mb-4" />

      <div className="flex flex-col gap-2.5 flex-1">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
          />
        ))}

        {tasks.length === 0 && (
          <div
            onClick={() => onAddTask(column.id)}
            className={`
              flex-1 flex flex-col items-center justify-center gap-2
              rounded-xl border border-dashed cursor-pointer min-h-[200px]
              transition-all duration-200 group
              ${isOver
                ? "border-white/20 bg-white/5"
                : "border-white/5 hover:border-white/15 hover:bg-white/[0.02]"
              }
            `}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center
                            bg-white/5 group-hover:bg-white/10 transition-colors
                            text-lg ${text}`}>
              +
            </div>
            <p className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors">
              Добавить задание
            </p>
          </div>
        )}
      </div>
    </div>
  );
}