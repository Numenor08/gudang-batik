import db from '../config/db.js';

class Log {
    static create(data, callback) {
        const { user_id, action } = data;
        const query = 'INSERT INTO logs (user_id, action) VALUES (?, ?)';
        db.query(query, [user_id, action], callback);
    }

    static getAll(callback) {
        const query = 'SELECT logs.*, users.username as username , users.img as img FROM logs LEFT JOIN users ON user_id = users.id';
        db.query(query, callback);
    }
    static deleteByUserId(userId, callback) {
        const query = 'DELETE FROM logs WHERE user_id = ?';
        db.query(query, [userId], callback);
    }
}

export default Log;