import db from '../config/db.js';

class Log {
    static create(data, callback) {
        const { user_id, action } = data;
        const query = 'INSERT INTO logs (user_id, action) VALUES (?, ?)';
        db.query(query, [user_id, action], callback);
    }

    static getAll(callback) {
        const query = 'SELECT * FROM logs';
        db.query(query, callback);
    }
}

export default Log;