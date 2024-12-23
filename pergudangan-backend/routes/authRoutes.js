import express from 'express';
import { registerUser, loginUser, forgotPassword, getImgById, getUserById ,getAllUser, updateUser, deleteUser, refreshToken, logoutUser } from '../controllers/userController.js';
import { upload } from '../lib/myMulter.js';
import { verifyToken, checkRefreshToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllUser);
router.get('/img/:id',verifyToken, getImgById);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, upload.single('img'), updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post('/refresh-token', checkRefreshToken, refreshToken);
router.post('/register', upload.single('img'), registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/logout', logoutUser);

export default router;