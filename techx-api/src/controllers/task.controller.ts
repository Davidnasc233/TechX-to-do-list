import { Request, Response } from 'express';
import { db } from '../config/database';

export const getTasks = async (_req: Request, res: Response) => {
  const [rows] = await db.query('SELECT * FROM tasks');
  res.json(rows);
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const [result] = await db.query('INSERT INTO tasks (title) VALUES (?)', [title]);
  res.json({ id: (result as any).insertId, title, completed: false });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  res.sendStatus(204);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  await db.query('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, id]);
  res.sendStatus(200);
};
