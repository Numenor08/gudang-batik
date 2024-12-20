import Supplier from '../models/Supplier.js';
import { logActivity } from './logController.js';
import db from '../config/db.js';

export const getAllSuppliers = (req, res) => {
    Supplier.getAll(db, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching suppliers', error: err });
        }
        res.json(result);
    });
};

export const getSupplierById = (req, res) => {
    const supplierId = req.params.id;
    Supplier.getById(db, supplierId, (err, result) => {
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
    const { name, contact_person, phone, email, address, img } = req.body;
    const supplierData = { name, contact_person, phone, email, address, img };

    Supplier.create(db, supplierData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating supplier', error: err });
        }

        logActivity(req.user.id, `Created Supplier with ID ${result.insertId}`);
        res.status(201).json({ message: 'Supplier created successfully', supplierId: result.insertId });
    });
};

export const updateSupplier = (req, res) => {
    const supplierId = req.params.id;
    const { name, contact_person, phone, email, address, img } = req.body;
    const supplierData = { name, contact_person, phone, email, address, img };

    Supplier.update(db, supplierId, supplierData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating supplier', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        logActivity(req.user.id, `Updated Supplier with ID ${supplierId}`);
        res.json({ message: 'Supplier updated successfully' });
    });
};

export const deleteSupplier = (req, res) => {
    const supplierId = req.params.id;

    Supplier.delete(db, supplierId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting supplier', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        logActivity(req.user.id, `Deleted Supplier with ID ${supplierId}`);
        res.json({ message: 'Supplier deleted successfully' });
    });
};