import Category from '../models/Category.js';
import { logActivity } from './logController.js';
import db from '../config/db.js';

export const getAllCategories = (req, res) => {
    Category.getAll(db, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching categories', error: err });
        }
        res.json(result);
    });
};

export const getCategoryById = (req, res) => {
    const categoryId = req.params.id;
    Category.getById(db, categoryId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching category', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(result[0]);
    });
};

export const createCategory = (req, res) => {
    const { name, description } = req.body;
    const categoryData = { name, description };

    Category.create(db, categoryData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating category', error: err });
        }

        logActivity(req.user.id, `Created Category with ID ${result.insertId}`);
        res.status(201).json({ message: 'Category created successfully' });
    });
};

export const updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;
    const categoryData = { name, description };

    Category.update(db, categoryId, categoryData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating category', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        logActivity(req.user.id, `Updated Category with ID ${categoryId}`);
        res.json({ message: 'Category updated successfully' });
    });
};

export const deleteCategory = (req, res) => {
    const categoryId = req.params.id;

    Category.delete(db, categoryId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting category', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        logActivity(req.user.id, `Deleted Category with ID ${categoryId}`);
        res.json({ message: 'Category deleted successfully' });
    });
};