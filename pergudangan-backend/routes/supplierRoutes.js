import express from 'express';
import { getAllSuppliers, getSupplierById, getMostActiveSupplier, createSupplier, updateSupplier, deleteSupplier } from '../controllers/supplierController.js';
import { upload } from '../lib/myMulter.js';

const router = express.Router();

router.get('/most-active', getMostActiveSupplier);
router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);
router.post('/',upload.single('img'), createSupplier);
router.put('/:id',upload.single('img'), updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;