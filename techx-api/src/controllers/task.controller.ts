import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import { db } from '../config/database';
import jwt from 'jsonwebtoken';

const bcrypt = require('bcryptjs');


export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
};

export const postTask = async (req: Request, res: Response) => {
  const task = req.body;
  await taskService.createTask(task);
  res.status(201).send('Task created');
};

export const putTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = req.body;
  await taskService.updateTask(id, task);
  res.send('Task updated');
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await taskService.deleteTask(id);
  res.send('Task deleted');
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [existing]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'Usuário já existe' });

    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [users]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao autenticar' });
  }
};