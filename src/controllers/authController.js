import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../server.js';

class AuthController {
    async register(req, res) {
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

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];
            if (!user) {
                return res.status(400).send('User not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('Invalid password');
            }

            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new AuthController();
