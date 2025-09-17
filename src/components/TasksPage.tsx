import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import TodoList from "./TodoList";
import type { Task } from "../types";

type Filter = "all" | "completed";

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    // نمونه اولیه
    { id: 1, title: "Redesign header", completed: false },
    { id: 2, title: "Fix navbar bug", completed: true },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const completedCount = tasks.filter((t) => t.completed).length;

  const filtered = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const handleAdd = () => {
    const title = newTitle.trim();
    if (!title) return;
    const next: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks((prev) => [next, ...prev]);
    setNewTitle("");
  };

  const handleDeleteTask = (id: Task["id"]) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEditTask = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 rounded-2xl bg-white/60 backdrop-blur border border-white/60 shadow-sm p-5 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
            <span className="text-sm text-gray-500">
              {completedCount}/{tasks.length} completed
            </span>
          </div>
        </div>

        {/* Add box */}
        <div className="mb-4 rounded-2xl bg-white border border-gray-100 shadow p-2 flex gap-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add
          </motion.button>
        </div>

        {/* Filter tabs */}
        <div className="relative mb-4 inline-flex rounded-xl bg-gray-100 p-1">
          <Tab active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </Tab>
          <Tab
            active={filter === "completed"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </Tab>
          <motion.div
            layout
            className={`absolute top-1 bottom-1 rounded-lg bg-white shadow ${
              filter === "all"
                ? "left-1 right-[calc(50%-0.25rem)]"
                : "left-[calc(50%+0.25rem)] right-1"
            }`}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        </div>

        {/* List */}
        <div className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-sm p-3">
          <TodoList
            list={filtered}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
          {filtered.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-6">
              {filter === "completed"
                ? "No completed tasks yet."
                : "No tasks. Add your first one!"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Tab: React.FC<{
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`relative cursor-pointer z-2 px-4 py-2 rounded-lg text-sm transition ${
      active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
    }`}
  >
    {children}
  </button>
);

export default TasksPage;
