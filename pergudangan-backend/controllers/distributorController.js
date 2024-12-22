import Distributor from '../models/Distributor.js';
import { logActivity } from './logController.js';
import db from '../config/db.js';

export const getAllDistributors = (req, res) => {
    Distributor.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching distributors', error: err });
        }
        res.json(result);
    });
};

export const getDistributorById = (req, res) => {
    const distributorId = parseInt(req.params.id, 10); // Ensure the ID is a number
    if (isNaN(distributorId)) {
        return res.status(400).json({ message: 'Invalid distributor ID' });
    }

    Distributor.getById(distributorId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching distributor', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Distributor not found' });
        }
        res.json(result[0]);
    });
};

export const createDistributor = (req, res) => {
    const { name, contact_person, phone, email, address, img } = req.body;
    const distributorData = { name, contact_person, phone, email, address, img };

    Distributor.create(distributorData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating distributor', error: err });
        }

        logActivity(req.user.id, `Created Distributor with ID ${result.insertId}`);
        res.status(201).json({ message: 'Distributor created successfully', distributorId: result.insertId });
    });
};

export const updateDistributor = (req, res) => {
    const distributorId = req.params.id;
    const { name, contact_person, phone, email, address, img } = req.body;
    const distributorData = { name, contact_person, phone, email, address, img };

    Distributor.update(distributorId, distributorData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating distributor', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Distributor not found' });
        }

        logActivity(req.user.id, `Updated Distributor with ID ${distributorId}`);
        res.json({ message: 'Distributor updated successfully' });
    });
};

export const deleteDistributor = (req, res) => {
    const distributorId = req.params.id;

    Distributor.delete(distributorId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting distributor', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Distributor not found' });
        }

        logActivity(req.user.id, `Deleted Distributor with ID ${distributorId}`);
        res.json({ message: 'Distributor deleted successfully' });
    });
};

export const getMostActiveDistributor = (req, res) => {
    Distributor.getMostActive((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching most active distributor', error: err });
        }
        res.json(result[0]);
    });
}