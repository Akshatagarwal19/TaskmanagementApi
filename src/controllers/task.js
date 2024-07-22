import db from '../../server.js';
import UserController from './user.js';

class TaskControllers {
    async getAllTasks(req, res) {
        try {
            const result = await db.query('SELECT * FROM tasks');
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getTaskById(req, res) {
        try {
            const result = await db.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
            const task = result.rows[0];
            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).send('Task not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async createTask(req, res) {
        try {
            const { user_id, title, description, due_date, status } = req.body;
            // Ensure the user exists
            const userResult = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);
            const user = userResult.rows[0];
            if (user) {
                const result = await db.query(
                    'INSERT INTO tasks (user_id, title, description, due_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [user_id, title, description, due_date, status]
                );
                res.status(201).json(result.rows[0]);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updateTask(req, res) {
        try {
            const { title, description, due_date, status } = req.body;
            const result = await db.query(
                'UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 RETURNING *',
                [title, description, due_date, status, req.params.id]
            );
            const task = result.rows[0];
            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).send('Task not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deleteTask(req, res) {
        try {
            const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id]);
            if (result.rowCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).send('Task not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new TaskControllers();
