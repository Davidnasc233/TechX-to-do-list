import { Request, Response } from 'express';
import { db } from '../database/index';
import { Task } from '../models/task.model';

export const getTasks = async (_: Request, res: Response) => {
  const [rows] = await db.query('SELECT * FROM tasks');
  res.json(rows);
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  await db.query('INSERT INTO tasks (title, completed) VALUES (?, false)', [title]);
  res.status(201).json({ message: 'Task created' });
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  await db.query('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, id]);
  res.json({ message: 'Task updated' });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  res.json({ message: 'Task deleted' });
};
