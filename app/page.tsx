"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Board from "@/components/Board";
import AddTaskModal from "@/components/AddTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import { useBoardStore } from "@/store/boardStore";
import { ColumnId } from "@/types";

export default function HomePage() {
  const addTask = useBoardStore((s) => s.addTask);
  const editingTask = useBoardStore((s) => s.editingTask);      
  const setEditingTask = useBoardStore((s) => s.setEditingTask); 

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [defaultColumn, setDefaultColumn] = useState<ColumnId>("todo");

  const handleOpenAdd = (columnId: ColumnId = "todo") => {
    setDefaultColumn(columnId);
    setIsAddOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddTask={() => handleOpenAdd()} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Mоя доска</h1>
          <p className="text-sm text-gray-500">
           Перетаскивайте задачи между таблицами, чтоб обновить их статус
          </p>
        </div>
        <Board onAddTask={handleOpenAdd} />
      </main>

      <AddTaskModal
        isOpen={isAddOpen}
        defaultColumnId={defaultColumn}
        onClose={() => setIsAddOpen(false)}
        onAdd={addTask}
      />

    
      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
      />
    </div>
  );
}