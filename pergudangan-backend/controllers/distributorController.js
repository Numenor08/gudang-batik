import Distributor from '../models/Distributor.js';
import { logActivity } from './logController.js';
import db from '../config/db.js';
import path from 'path';
import fs from 'fs';

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
    const { name, contact_person, phone, email, address } = req.body;
    const img = req.file ? req.file.path : null;
    const distributorData = { name, contact_person, phone, email, address, img };

    Distributor.create(distributorData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating distributor', error: err });
        }

        logActivity(req.user.userId, `Created Distributor with ID ${result.insertId}`);
        res.status(201).json({ message: 'Distributor created successfully', distributorId: result.insertId });
    });
};

export const updateDistributor = (req, res) => {
    const distributorId = req.params.id;
    const { name, contact_person, phone, email, address } = req.body;
    const img = req.file ? req.file.path : null;

    Distributor.getById(distributorId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching distributor data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Distributor not found' });
        }

        const oldImgPath = result[0].img;
        const distributorData = { name, contact_person, phone, email, address };
        if (img) {
            distributorData.img = img;
        } else {
            distributorData.img = oldImgPath;
        }

        Distributor.update(distributorId, distributorData, (err, updateResult) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating distributor', error: err });
            }
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Distributor not found' });
            }

            if (img && oldImgPath) {
                const fullPath = path.resolve(oldImgPath);
                fs.unlink(fullPath, (unlinkErr) => {
                    if (unlinkErr) {
                        return res.status(500).json({ message: 'Error deleting old distributor image', error: unlinkErr });
                    }

                    logActivity(req.user.userId, `Updated Distributor with ID ${distributorId}`);
                    res.json({ message: 'Distributor updated successfully' });
                });
            } else {
                logActivity(req.user.userId, `Updated Distributor with ID ${distributorId}`);
                res.json({ message: 'Distributor updated successfully' });
            }
        });
    });
};

export const deleteDistributor = (req, res) => {
    const distributorId = req.params.id;

    Distributor.getById(distributorId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching distributor data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Distributor not found' });
        }

        const imgPath = result[0].img;

        Distributor.delete(distributorId, (err, deleteResult) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting distributor', error: err });
            }
            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Distributor not found' });
            }

            if (imgPath) {
                const fullPath = path.resolve(imgPath);
                fs.unlink(fullPath, (unlinkErr) => {
                    if (unlinkErr) {
                        return res.status(500).json({ message: 'Error deleting distributor image', error: unlinkErr });
                    }

                    logActivity(req.user.userId, `Deleted Distributor with ID ${distributorId}`);
                    res.json({ message: 'Distributor deleted successfully' });
                });
            } else {
                logActivity(req.user.userId, `Deleted Distributor with ID ${distributorId}`);
                res.json({ message: 'Distributor deleted successfully' });
            }
        });
    });
};

export const getMostActiveDistributor = (req, res) => {
    Distributor.getMostActive((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching most active distributor', error: err });
        }
        res.json(result[0]);
    });
};