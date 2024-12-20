import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = (req, res) => {
    const { username, password, role, email, img } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password', error: err });
        }

        const userData = { username, password: hashedPassword, role, email, img };

        User.create(userData, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating user', error: err });
            }

            res.status(201).json({ message: 'User created successfully'});
        });
    });
};

export const loginUser = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords', error: err });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ message: 'Login successful', token });
        });
    });
};