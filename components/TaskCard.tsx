"use client";

import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onDragStart: (taskId: string) => void;
}

export default function TaskCard({ task, onDelete, onDragStart }: TaskCardProps) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task.id)}
      className="bg-gray-800/60 hover:bg-gray-800 border border-white/5 hover:border-white/10
                 rounded-xl p-3.5 cursor-grab active:cursor-grabbing
                 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5
                 transition-all duration-150 group"
    >
      
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-gray-100 leading-snug flex-1">
          {task.title}
        </h3>
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-md
                     flex items-center justify-center flex-shrink-0
                     text-gray-500 hover:text-red-400 hover:bg-red-400/10
                     transition-all duration-150 text-base leading-none"
          aria-label="Delete task"
        >
          ×
        </button>
      </div>

     
      {task.description && (
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      )}

     
      <div className="mt-3 flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-gray-600" />
        <span className="text-xs text-gray-600">{formattedDate}</span>
      </div>
    </div>
  );
}