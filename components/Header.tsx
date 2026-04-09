"use client";

interface HeaderProps {
  onAddTask: () => void;
}

export default function Header({ onAddTask }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white rounded-sm" />
              ))}
            </div>
          </div>
          <span className="text-base font-semibold text-white tracking-tight">
            Kanban
          </span>
        </div>

        <button
          onClick={onAddTask}
          className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400
                     text-white px-3.5 py-1.5 rounded-lg text-sm font-medium
                     transition-all duration-150 hover:shadow-lg hover:shadow-indigo-500/25
                     active:scale-95"
        >
          <span className="text-base leading-none">+</span>
           Добавить задание
        </button>
      </div>
    </header>
  );
}