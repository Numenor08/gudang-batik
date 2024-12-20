import db from '../config/db.js';

class Transaction {
    static create(data, callback) {
        const { batik_id, user_id, type, quantity, supplier_id, distributor_id } = data;
        const query = 'INSERT INTO transactions (batik_id, user_id, type, quantity, supplier_id, distributor_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [batik_id, user_id, type, quantity, supplier_id, distributor_id], callback);
    }

    static getAll(callback) {
        const query = 'SELECT * FROM transactions';
        db.query(query, callback);
    }
}

export default Transaction;