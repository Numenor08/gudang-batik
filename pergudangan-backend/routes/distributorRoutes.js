import express from 'express';
import { getAllDistributors, getDistributorById, createDistributor, getMostActiveDistributor , updateDistributor, deleteDistributor } from '../controllers/distributorController.js';

const router = express.Router();

router.get('/most-active', getMostActiveDistributor);
router.get('/', getAllDistributors);
router.get('/:id', getDistributorById);
router.post('/', createDistributor);
router.put('/:id', updateDistributor);
router.delete('/:id', deleteDistributor);

export default router;