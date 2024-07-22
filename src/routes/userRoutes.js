import express from 'express';
import Usercontroller from "../controllers/user.js";
import authenticateToken from "../middleware/authMiddleware.js"

const router = express.Router();

router.get('/', authenticateToken, Usercontroller.getAllUsers);
router.get('/:id', authenticateToken, Usercontroller.getUserById);
router.post('/', authenticateToken, Usercontroller.createUser);
router.delete('/:id', authenticateToken, Usercontroller.deleteUser);

export default router;