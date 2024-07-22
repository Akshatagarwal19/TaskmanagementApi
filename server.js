import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/userRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import authenticateToken from "./src/middleware/authMiddleware.js";
import { error } from "console";
import { title } from "process";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "TaskManagementApi",
    password: "postgres",
    port: 5432,
  });

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API');
});


app.use('/auth', authRoutes);

app.use('/users',authenticateToken, userRoutes);
app.use('/tasks',authenticateToken, taskRoutes);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});

export default db;