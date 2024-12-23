import Supplier from '../models/Supplier.js';
import { logActivity } from './logController.js';
import db from '../config/db.js';

export const getAllSuppliers = (req, res) => {
    Supplier.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching suppliers', error: err });
        }
        res.json(result);
    });
};

export const getSupplierById = (req, res) => {
    const supplierId = parseInt(req.params.id, 10); // Ensure the ID is a number
    if (isNaN(supplierId)) {
        return res.status(400).json({ message: 'Invalid distributor ID' });
    }

    Supplier.getById(supplierId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching supplier', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(result[0]);
    });
};

export const createSupplier = (req, res) => {
    const { name, contact_person, phone, email, address } = req.body;
    const img = req.file? req.file.path : null;
    const supplierData = { name, contact_person, phone, email, address, img };

    Supplier.create(supplierData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating supplier', error: err });
        }

        logActivity(req.user.userId, `Created Supplier: ${supplierData.name}`);
        res.status(201).json({ message: 'Supplier created successfully', supplierId: result.insertId });
    });
};

export const updateSupplier = (req, res) => {
    const supplierId = req.params.id;
    const { name, contact_person, phone, email, address } = req.body;
    const img = req.file ? req.file.path : null;

    Supplier.getById(supplierId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching supplier data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        const oldImgPath = result[0].img;
        const supplierData = { name, contact_person, phone, email, address };
        if (img) {
            supplierData.img = img;
        } else {
            supplierData.img = oldImgPath;
        }

        Supplier.update(supplierId, supplierData, (err, updateResult) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating supplier', error: err });
            }
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            if (img && oldImgPath) {
                const fullPath = path.resolve(oldImgPath);
                fs.unlink(fullPath, (unlinkErr) => {
                    if (unlinkErr) {
                        return res.status(500).json({ message: 'Error deleting old supplier image', error: unlinkErr });
                    }

                    logActivity(req.user.userId, `Updated Supplier ${supplierData .name || supplierId}`);
                    res.json({ message: 'Supplier updated successfully' });
                });
            } else {
                logActivity(req.user.userId, `Updated Supplier ${supplierData.name || supplierId}`);
                res.json({ message: 'Supplier updated successfully' });
            }
        });
    });
};

export const deleteSupplier = (req, res) => {
    const supplierId = req.params.id;

    Supplier.delete(supplierId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting supplier', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        logActivity(req.user.userId, `Deleted Supplier with ID ${supplierId}`);
        res.json({ message: 'Supplier deleted successfully' });
    });
};

export const getMostActiveSupplier = (req, res) => {
    Supplier.getMostActiveSupplier((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching most active supplier', error: err });
        }
        res.json(result[0]);
    });
};