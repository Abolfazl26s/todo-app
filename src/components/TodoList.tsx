import { AnimatePresence } from "framer-motion";
import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface TodoListProps {
  list: Task[];
  onDeleteTask: (id: Task["id"]) => void;
  onEditTask: (updatedTask: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  list,
  onDeleteTask,
  onEditTask,
}) => {
  return (
    <ul className="space-y-2">
      <AnimatePresence initial={false} mode="popLayout">
        {list.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TodoList;
