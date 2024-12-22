import db from '../config/db.js';

class Supplier {
    static create(data, callback) {
        const { name, contact_person, phone, email, address, img } = data;
        const query = 'INSERT INTO suppliers (name, contact_person, phone, email, address, img) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [name, contact_person, phone, email, address, img], callback);
    }

    static getAll(callback) {
        const query = 'SELECT * FROM suppliers';
        db.query(query, callback);
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM suppliers WHERE id = ?';
        db.query(query, [id], callback);
    }

    static update(id, data, callback) {
        const { name, contact_person, phone, email, address, img } = data;
        const query = 'UPDATE suppliers SET name = ?, contact_person = ?, phone = ?, email = ?, address = ?, img = ? WHERE id = ?';
        db.query(query, [name, contact_person, phone, email, address, img, id], callback);
    }

    static delete(id, callback) {
        const query = 'DELETE FROM suppliers WHERE id = ?';
        db.query(query, [id], callback);
    }

    static getMostActiveSupplier(callback) {
        const query = `SELECT s.name AS name, COUNT(t.id) AS transaction
        FROM transactions t
        JOIN suppliers s ON t.supplier_id = s.id
        WHERE t.type = 'in'
        GROUP BY s.name
        ORDER BY transaction DESC
        LIMIT 1;`
        db.query(query, callback);
    } 
}

export default Supplier;