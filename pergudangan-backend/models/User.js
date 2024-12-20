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
}

export default User;