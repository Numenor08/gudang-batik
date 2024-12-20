import express from 'express';
import { getAllDistributors, getDistributorById, createDistributor, updateDistributor, deleteDistributor } from '../controllers/distributorController.js';

const router = express.Router();

router.get('/', getAllDistributors);
router.get('/:id', getDistributorById);
router.post('/', createDistributor);
router.put('/:id', updateDistributor);
router.delete('/:id', deleteDistributor);

export default router;