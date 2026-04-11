"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Board from "@/components/Board";
import AddTaskModal from "@/components/AddTaskModal";
import { useBoardStore } from "@/store/boardStore";
import { ColumnId } from "@/types";

export default function HomePage() {
  const loadBoard = useBoardStore((s) => s.loadBoard);
  const addTask = useBoardStore((s) => s.addTask);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultColumn, setDefaultColumn] = useState<ColumnId>("todo");

  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  const handleOpenModal = (columnId: ColumnId = "todo") => {
    setDefaultColumn(columnId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddTask={() => handleOpenModal()} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">My Board</h1>
          <p className="text-sm text-gray-500">
            Drag and drop tasks between columns to update their status.
          </p>
        </div>
        <Board onAddTask={handleOpenModal} />
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