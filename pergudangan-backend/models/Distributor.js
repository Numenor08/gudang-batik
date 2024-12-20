import db from '../config/db.js';

class Distributor {
    static create(data, callback) {
        const { name, contact_person, phone, email, address, img } = data;
        const query = 'INSERT INTO distributors (name, contact_person, phone, email, address, img) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [name, contact_person, phone, email, address, img], callback);
    }

    static getAll(callback) {
        const query = 'SELECT * FROM distributors';
        db.query(query, callback);
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM distributors WHERE id = ?';
        db.query(query, [id], callback);
    }

    static update(id, data, callback) {
        const { name, contact_person, phone, email, address, img } = data;
        const query = 'UPDATE distributors SET name = ?, contact_person = ?, phone = ?, email = ?, address = ?, img = ? WHERE id = ?';
        db.query(query, [name, contact_person, phone, email, address, img, id], callback);
    }

    static delete(id, callback) {
        const query = 'DELETE FROM distributors WHERE id = ?';
        db.query(query, [id], callback);
    }
}

export default Distributor;