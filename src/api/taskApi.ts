import type { Task } from "../types";

const API_URL = "http://localhost:3001/tasks";

// دریافت تمام تسک‌ها
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

// افزودن تسک جدید
export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

// ویرایش تسک
export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

// حذف تسک
export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
