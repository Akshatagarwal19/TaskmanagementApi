import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../server.js';

class UserController {
    async getAllUsers(req, res) {
        try {
            const result = await db.query('SELECT * FROM users');
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getUserById(req, res) {
        try {
            const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
            const user = result.rows[0];
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async createUser(req, res) {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
                [username, email, hashedPassword]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
            if (result.rowCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.error('Error deleting user:', error.message);
            res.status(500).send(error.message);
        }
    }
}

export default new UserController();
