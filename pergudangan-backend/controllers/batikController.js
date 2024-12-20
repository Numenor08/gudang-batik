import Batik from '../models/Batik.js';
import { logActivity } from './logController.js';

export const getAllBatik = (req, res) => {
    Batik.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching batik data', error: err });
        }
        res.json(result);
    });
};

export const getBatikById = (req, res) => {
    const batikId = req.params.id;
    Batik.getById(batikId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching batik data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Batik not found' });
        }
        res.json(result[0]);
    });
};

export const createBatik = (req, res) => {
    const { name, color, size, stock, min_stock, img, category_id } = req.body;
    const batikData = { name, color, size, stock, min_stock, img, category_id };

    Batik.create(batikData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating batik', error: err });
        }

        logActivity(req.user.id, `Created Batik with ID ${result.insertId}`);
        res.status(201).json({ message: 'Batik created successfully'});
    });
};

export const updateBatik = (req, res) => {
    const batikId = req.params.id;
    const { name, color, size, stock, min_stock, img, category_id } = req.body;
    const batikData = { name, color, size, stock, min_stock, img, category_id };

    Batik.update(batikId, batikData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating batik', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Batik not found' });
        }

        logActivity(req.user.id, `Updated Batik with ID ${batikId}`);
        res.json({ message: 'Batik updated successfully' });
    });
};

export const deleteBatik = (req, res) => {
    const batikId = req.params.id;

    Batik.delete(batikId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting batik', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Batik not found' });
        }

        logActivity(req.user.id, `Deleted Batik with ID ${batikId}`);
        res.json({ message: 'Batik deleted successfully' });
    });
};