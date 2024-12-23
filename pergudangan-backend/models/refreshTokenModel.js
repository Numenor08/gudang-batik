import db from '../config/db.js';

export const addRefreshToken = (userId, token, expiresAt) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)';
        db.query(query, [userId, token, expiresAt], (err, result) => {
            if (err) {
                return reject(new Error('Error adding refresh token: ' + err.message));
            }
            resolve(result);
        });
    });
};

export const findRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM refresh_tokens WHERE token = ?';
        db.query(query, [token], (err, result) => {
            if (err) {
                return reject(new Error('Error finding refresh token: ' + err.message));
            }
            resolve(result[0]);
        });
    });
};

export const deleteRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM refresh_tokens WHERE token = ?';
        db.query(query, [token], (err, result) => {
            if (err) {
                console.log(err);
                return reject(new Error('Error deleting refresh token: ' + err.message));
            }
            resolve(result);
        });
    });
};