import express from 'express';
import { getAllBatik, getBatikById, getMostStockbyCategory, createBatik, updateBatik, deleteBatik, getTotalStock, getTopBatik } from '../controllers/batikController.js';
import { upload } from '../lib/myMulter.js';

const router = express.Router();

router.get('/most-stock', getMostStockbyCategory);
router.get('/total-stock', getTotalStock);
router.get('/top', getTopBatik);
router.get('/', getAllBatik);
router.get('/:id', getBatikById);
router.post('/', upload.single('img'), createBatik);
router.put('/:id', upload.single('img'), updateBatik);
router.delete('/:id', deleteBatik);

export default router;