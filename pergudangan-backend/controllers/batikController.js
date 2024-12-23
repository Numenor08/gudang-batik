import Batik from '../models/Batik.js';
import { logActivity } from './logController.js';
import fs from 'fs';
import path from 'path';

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

export const getTotalStock = (req, res) => {
    Batik.getTotalStock((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching total stock', error: err });
        }
        res.json(result[0]);
    });
};

export const getTopBatik = (req, res) => {
    Batik.getTopBatik((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching top 7 batik', error: err });
        }
        res.json(result);
    });
};

export const getMostStockbyCategory = (req, res) => {
    Batik.getMostStockbyCategory((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching most stock by category', error: err });
        }
        res.json(result[0]);
    });
}

export const createBatik = (req, res) => {
    const { name, color, size, stock, min_stock, category_id } = req.body;
    const img = req.file ? req.file.path : null;
    const batikData = { name, color, size, stock, min_stock, img, category_id };

    Batik.create(batikData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating batik', error: err });
        }

        logActivity(req.user.userId, `Created Batik ${batikData.name}`);
        res.status(201).json({ message: 'Batik created successfully'});
    });
};

export const updateBatik = (req, res) => {
    const batikId = req.params.id;
    const { name, color, size, stock, min_stock, category_id } = req.body;
    const img = req.file ? req.file.path : null;
    
    Batik.getById(batikId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching batik data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Batik not found' });
        }
        
        const oldImgPath = result[0].img;
        const batikData = { name, color, size, stock, min_stock, category_id };
        if (img) {
            updatedData.img = img;
        } else {
            updatedData.img = oldImgPath;
        }

        Batik.update(batikId, batikData, (err, updateResult) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating batik', error: err });
            }
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Batik not found' });
            }

            if (img && oldImgPath) {
                const fullPath = path.resolve(oldImgPath);
                fs.unlink(fullPath, (unlinkErr) => {
                    if (unlinkErr) {
                        return res.status(500).json({ message: 'Error deleting old batik image', error: unlinkErr });
                    }

                    logActivity(req.user.userId, `Updated Batik ${batikId.name || batikId}`);
                    res.json({ message: 'Batik updated successfully' });
                });
            } else {
                logActivity(req.user.userId, `Updated Batik ${batikId.name || batikId}`);
                res.json({ message: 'Batik updated successfully' });
            }
        });
    });
};

export const deleteBatik = (req, res) => {
    const batikId = req.params.id;

    Batik.getById(batikId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching batik data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Batik not found' });
        }

        const imgPath = result[0].img;

        Batik.delete(batikId, (err, deleteResult) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting batik', error: err });
            }
            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Batik not found' });
            }

            if (imgPath) {
                const fullPath = path.resolve(imgPath);
                fs.unlink(fullPath, (unlinkErr) => {
                    if (unlinkErr) {
                        return res.status(500).json({ message: 'Error deleting batik image', error: unlinkErr });
                    }

                    logActivity(req.user.userId, `Deleted Batik with ID ${batikId}`);
                    res.json({ message: 'Batik deleted successfully' });
                });
            } else {
                logActivity(req.user.userId, `Deleted Batik with ID ${batikId}`);
                res.json({ message: 'Batik deleted successfully' });
            }
        });
    });
};
