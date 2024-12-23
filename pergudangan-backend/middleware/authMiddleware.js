// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' }); // Gunakan 401
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const isExpired = err.name === 'TokenExpiredError';
            return res.status(401).json({
                message: isExpired
                    ? 'Access token expired'
                    : 'Invalid access token',
            });
        }

        req.user = decoded.data;
        next();
    });
};


export const verifyRefreshToken = (req, res, next) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: 'No refresh token provided' }); // Gunakan 401
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            const isExpired = err.name === 'TokenExpiredError';
            return res.status(401).json({
                message: isExpired
                    ? 'Refresh token expired'
                    : 'Invalid refresh token',
            });
        }

        req.user = decoded.data;
        next();
    });
};


export const checkRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' }); // Gunakan 401
    }

    next();
};
