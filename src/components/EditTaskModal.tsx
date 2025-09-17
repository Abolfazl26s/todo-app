import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Task } from "../types";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onSave: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onSave,
}) => {
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);

  useEffect(() => {
    setTitle(task.title);
    setCompleted(task.completed);
  }, [task]);

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave({ ...task, title: trimmed, completed });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full max-w-md rounded-2xl bg-white/80 dark:bg-slate-800/90 backdrop-blur shadow-2xl ring-1 ring-black/5"
          >
            <div className="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
                Edit Task
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                  Title
                </label>
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 dark:placeholder-slate-400"
                  placeholder="e.g. Write tests"
                />
              </div>

              <label className="inline-flex items-center gap-2 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="h-4 w-4 rounded accent-indigo-600 dark:accent-indigo-400"
                />
                <span className="text-sm text-gray-700 dark:text-slate-200">
                  Completed
                </span>
              </label>
            </div>

            <div className="px-6 pb-6 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditTaskModal;
