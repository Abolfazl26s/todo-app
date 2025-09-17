import { useState } from "react";

interface TaskFormProps {
  onAddTask: (task: { title: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    onAddTask({
      title: taskTitle,
    });
    setTaskTitle("");
  };

  return (
    <form className="w-full flex " onSubmit={(e) => HandleSubmit(e)}>
      <div className="flex-col w-full">
        <label htmlFor="taskTitle" className="ml-1 mb-2 font-bold">
          Title
        </label>
        <div className="w-full p-0 flex items-center justify-center">
          <input
            type="text"
            name="taskTitle"
            className="w-full border focus:outline-none h-9 px-3 rounded-l "
            id="taskTitle"
            placeholder="Add New Todo..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button
            type="submit"
            className=" h-9 w-1/3 rounded-r border-1 border-amber-500 text-amber-500 mb-0 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
export default TaskForm;
