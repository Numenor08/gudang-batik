import express from 'express';
import { registerUser, loginUser, forgotPassword, getAllUser, updateUser, deleteUser } from '../controllers/userController.js';
import { upload } from '../lib/myMulter.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllUser);
router.put('/:id', verifyToken, upload.single('img'), updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post('/register', upload.single('img'), registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);

export default router;