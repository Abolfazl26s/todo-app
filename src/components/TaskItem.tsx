import { motion } from "framer-motion";
import type { Task } from "../types";
import EditTaskModal from "./EditTaskModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onDeleteTask: (taskId: Task["id"]) => void;
  onEditTask: (updatedTask: Task) => void;
}

const variants = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.6 },
  },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18 } },
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDeleteTask,
  onEditTask,
}) => {
  const { id, title, completed } = task;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEditTask({ ...task, completed: e.target.checked });
  };

  return (
    <>
      <motion.li
        layout
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ layout: { type: "spring", stiffness: 500, damping: 32 } }}
        className="group rounded-xl border border-gray-100 dark:border-slate-700 bg-white/80 dark:bg-slate-800/70 backdrop-blur hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition"
      >
        <div className="flex items-center gap-3 p-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={completed}
              onChange={toggleCompleted}
              className="h-4 w-4 rounded accent-indigo-600 dark:accent-indigo-400"
            />
            <span className="sr-only">Toggle completed</span>
          </label>

          <div className="flex-1 overflow-hidden">
            <div
              className={`truncate font-medium ${
                completed
                  ? "text-gray-400 dark:text-slate-500 line-through"
                  : "text-gray-800 dark:text-slate-100"
              }`}
              title={title}
            >
              {title}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-2 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-gray-600 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
              aria-label="Edit"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-gray-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300 transition"
              aria-label="Delete"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      </motion.li>

      <EditTaskModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        task={task}
        onSave={(updated) => onEditTask(updated)}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => onDeleteTask(id)}
        title={title}
      />
    </>
  );
};

export default TaskItem;
