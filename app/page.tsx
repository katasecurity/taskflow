"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Board from "@/components/Board";
import AddTaskModal from "@/components/AddTaskModal";
import { useBoard } from "@/hooks/useBoard";
import { ColumnId } from "@/types";

export default function HomePage() {
  const { tasks, isLoaded, addTask, moveTask, deleteTask } = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultColumn, setDefaultColumn] = useState<ColumnId>("todo");

  const handleOpenModal = (columnId: ColumnId = "todo") => {
    setDefaultColumn(columnId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddTask={() => handleOpenModal()} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Mоя доска</h1>
          <p className="text-sm text-gray-500">
            Перетаскивайте задачи между столбцами
          </p>
        </div>
        <Board
          tasks={tasks}
          isLoaded={isLoaded}
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
          onAddTask={handleOpenModal}
        />
      </main>
      <AddTaskModal
        isOpen={isModalOpen}
        defaultColumnId={defaultColumn}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTask}
      />
    </div>
  );
}