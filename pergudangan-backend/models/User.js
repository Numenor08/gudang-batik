import db from '../config/db.js';

class User {
    static getAll(callback) {
        const query = 'SELECT id, username, role, email, img FROM users';
        db.query(query, callback);
    }

    static create(data, callback) {
        const { username, password, role, email, img } = data;
        const query = 'INSERT INTO users (username, password, role, email, img) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [username, password, role, email, img], callback);
    }

    static findById(id, callback) {
        const query = 'SELECT id, username, role, email, img FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
    
    static findByUsername(username, callback) {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    }

    static updatePassword(id, password, callback) {
        const query = 'UPDATE users SET password = ? WHERE id = ?';
        db.query(query, [password, id], callback);
    }

    static updateUser(id, data, callback) {
        const { username, role, email, img } = data;
        const query = 'UPDATE users SET username = ?, role = ?, email = ?, img = ? WHERE id = ?';
        db.query(query, [username, role, email, img, id], callback);
    }

    static delete(id, callback) {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
}

export default User;