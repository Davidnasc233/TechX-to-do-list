import { db } from '../config/database';
import { Task } from '../models/task.model';

export const getAllTasks = async (): Promise<Task[]> => {
  const [rows] = await db.query('SELECT * FROM tasks');
  return rows as Task[];
};

export const createTask = async (task: Task): Promise<void> => {
  await db.query('INSERT INTO tasks (title, completed) VALUES (?, ?)', [task.title, task.completed]);
};

export const updateTask = async (id: number, task: Task): Promise<void> => {
  await db.query('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [task.title, task.completed, id]);
};

export const deleteTask = async (id: number): Promise<void> => {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
};
