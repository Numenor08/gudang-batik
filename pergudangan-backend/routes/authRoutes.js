import express from 'express';
import { registerUser, loginUser, forgotPassword } from '../controllers/userController.js';
import { upload } from '../lib/myMulter.js';

const router = express.Router();

router.post('/register', upload.single('img'), registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword); // Tambahkan rute untuk forgot password

export default router;