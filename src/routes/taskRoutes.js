import express from 'express';
import TaskControllers from '../controllers/task.js';

const router = express.Router();

router.get('/', TaskControllers.getAllTasks);
router.get('/:id',TaskControllers.getTaskById);
router.post('/',TaskControllers.createTask);
router.put('/:id',TaskControllers.updateTask);
router.delete('/:id',TaskControllers.deleteTask);

export default router;