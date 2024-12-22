import express from 'express';
import { createTransaction, getAllTransactions, getLast7DaysTransactions, getTransactionToday } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/weekly', getLast7DaysTransactions);
router.get('/today', getTransactionToday);

export default router;