import db from '../config/db.js';

class Batik {
    static create(data, callback) {
        const { name, color, size, stock, min_stock, img, category_id } = data;
        const query = 'INSERT INTO batik (name, color, size, stock, min_stock, img, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [name, color, size, stock, min_stock, img, category_id], callback);
    }

    static getAll(callback) {
        const query = 'SELECT * FROM batik';
        db.query(query, callback);
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM batik WHERE id = ?';
        db.query(query, [id], callback);
    }

    static update(id, data, callback) {
        const { name, color, size, stock, min_stock, img, category_id } = data;
        const query = 'UPDATE batik SET name = ?, color = ?, size = ?, stock = ?, min_stock = ?, img = ?, category_id = ? WHERE id = ?';
        db.query(query, [name, color, size, stock, min_stock, img, category_id, id], callback);
    }

    static delete(id, callback) {
        const query = 'DELETE FROM batik WHERE id = ?';
        db.query(query, [id], callback);
    }
}

export default Batik;