import db from '../config/db.js';

class User {
    static create(data, callback) {
        const { username, password, role, email, img } = data;
        const query = 'INSERT INTO users (username, password, role, email, img) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [username, password, role, email, img], callback);
    }

    static findByUsername(username, callback) {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    }

    static updatePassword(id, password, callback) {
        const query = 'UPDATE users SET password = ? WHERE id = ?';
        db.query(query, [password, id], callback);
    }
}

export default User;