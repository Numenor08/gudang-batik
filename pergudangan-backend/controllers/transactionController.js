import Transaction from '../models/Transaction.js';
import { logActivity } from './logController.js';

export const createTransaction = (req, res) => {
    const { batik_id, type, quantity, supplier_id, distributor_id } = req.body;
    const user_id = req.user.userId;
    const transactionData = { batik_id, user_id, type, quantity, supplier_id, distributor_id };

    Transaction.create(transactionData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating transaction', error: err });
        }

        logActivity(req.user.userId, `Created Transaction with ID ${result.insertId}`);
        res.status(201).json({ message: 'Transaction created successfully', transactionId: result.insertId });
    });
};

export const getAllTransactions = (req, res) => {
    Transaction.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching transactions', error: err });
        }
        res.json(result);
    });
};

export const getLast7DaysTransactions = (req, res) => {
    Transaction.getLast7DaysTransactions((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching transactions', error: err });
        }
        res.json(result);
    });
}

export const getTransactionToday = (req, res) => {
    Transaction.getTransactionToday((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching transactions', error: err })
        }
        res.json(result[0]);
    })
}