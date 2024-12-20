import express from 'express';
import { getAllBatik, getBatikById, createBatik, updateBatik, deleteBatik } from '../controllers/batikController.js';

const router = express.Router();

router.get('/', getAllBatik);
router.get('/:id', getBatikById);
router.post('/', createBatik);
router.put('/:id', updateBatik);
router.delete('/:id', deleteBatik);

export default router;