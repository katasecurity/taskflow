"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types";
import { useBoardStore } from "@/store/boardStore";

interface EditTaskModalProps {
  task: Task | null; 
  onClose: () => void;
}

export default function EditTaskModal({ task, onClose }: EditTaskModalProps) {
  const editTask = useBoardStore((s) => s.editTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  if (!task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    editTask(task.id, title, description);
    onClose();
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm
                 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md
                      border border-white/10 overflow-hidden">
        
        <div className="flex items-center justify-between px-6 py-4
                        border-b border-white/5">
          <h2 className="text-base font-semibold text-white">Edit Task</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-7 h-7 rounded-lg flex items-center justify-center
                       text-gray-500 hover:text-gray-300 hover:bg-white/10
                       transition-all text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
         
          <div>
            <label className="block text-xs font-medium text-gray-400
                              mb-1.5 uppercase tracking-wider">
              Название <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-xl
                         bg-gray-800 border border-white/10
                         text-white text-sm placeholder:text-gray-600
                         focus:outline-none focus:border-indigo-500/60
                         transition-colors"
            />
          </div>

          
          <div>
            <label className="block text-xs font-medium text-gray-400
                              mb-1.5 uppercase tracking-wider">
              Описание
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={300}
              className="w-full px-3.5 py-2.5 rounded-xl
                         bg-gray-800 border border-white/10
                         text-white text-sm placeholder:text-gray-600
                         focus:outline-none focus:border-indigo-500/60
                         transition-colors resize-none"
            />
          </div>

         
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium
                         bg-white/5 hover:bg-white/10 text-gray-400
                         transition-colors"
            >
              Отменить
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium
                         bg-indigo-500 hover:bg-indigo-400 text-white
                         disabled:opacity-30 disabled:cursor-not-allowed
                         transition-all hover:shadow-lg hover:shadow-indigo-500/25
                         active:scale-95"
            >
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}