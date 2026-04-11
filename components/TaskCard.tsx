"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types";
import { useBoardStore } from "@/store/boardStore";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const deleteTask = useBoardStore((s) => s.deleteTask);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
  
      {...attributes}
      {...listeners}
      className={`
        bg-gray-800/60 border border-white/5 rounded-xl p-3.5
        hover:bg-gray-800 hover:border-white/10
        hover:shadow-xl hover:shadow-black/20
        transition-all duration-150 group select-none
        focus:outline-none focus:ring-2 focus:ring-white/20
        ${isDragging
          ? "opacity-40 scale-95 shadow-2xl cursor-grabbing"
          : "cursor-grab"
        }
      `}
      role="article"
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-gray-100 leading-snug flex-1">
          {task.title}
        </h3>
        <button
  
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => deleteTask(task.id)}
          aria-label={`Delete task: ${task.title}`}
          className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-md
                     flex items-center justify-center flex-shrink-0
                     text-gray-500 hover:text-red-400 hover:bg-red-400/10
                     focus:opacity-100 focus:outline-none focus:ring-2
                     focus:ring-red-400/30 transition-all duration-150
                     text-base leading-none"
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
        <div className="w-1 h-1 rounded-full bg-gray-600" aria-hidden="true" />
        <span className="text-xs text-gray-600">{formattedDate}</span>
      </div>
    </div>
  );
}