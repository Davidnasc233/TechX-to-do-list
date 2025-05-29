import { Router } from 'express';
import * as controller from '../controllers/task.controller';

const router = Router();

router.get('/tasks', controller.getTasks);
router.post('/tasks', controller.postTask);
router.put('/tasks/:id', controller.putTask);
router.delete('/tasks/:id', controller.deleteTask);
router.post('todo/pages/register', controller.register);
router.post('todo/pages/login', controller.login);

export default router;
