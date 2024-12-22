import express from 'express';
import { getAllDistributors, getDistributorById, createDistributor, getMostActiveDistributor , updateDistributor, deleteDistributor } from '../controllers/distributorController.js';
import { upload } from '../lib/myMulter.js';

const router = express.Router();

router.get('/most-active', getMostActiveDistributor);
router.get('/', getAllDistributors);
router.get('/:id', getDistributorById);
router.post('/',upload.single('img') , createDistributor);
router.put('/:id',upload.single('img') , updateDistributor);
router.delete('/:id', deleteDistributor);

export default router;