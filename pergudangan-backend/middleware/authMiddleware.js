// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        req.user = decoded.data;
        next();
    });
};

export const verifyRefreshToken = (req, res, next) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(403).json({ message: 'No refresh token provided' });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate refresh token' });
        }

        req.user = decoded.data;
        next();
    });
};

export const checkRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'No refresh token provided' });
    }

    next();
};