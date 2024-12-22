import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const registerUser = (req, res) => {
    const { username, password, role, email } = req.body;
    const img = req.file ? req.file.path : null;

    // Periksa apakah username sudah ada
    User.findByUsername(username, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error checking username', error: err });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash password dan buat pengguna baru
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ message: 'Error hashing password', error: err });
            }

            const userData = { username, password: hashedPassword, role, email, img };

            User.create(userData, (err, result) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return res.status(500).json({ message: 'Error creating user', error: err });
                }

                res.status(201).json({ message: 'User created successfully' });
            });
        });
    });
};

export const loginUser = (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
    
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

            const token = jwt.sign({ data: { userId: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ 
                message: 'Login successful', 
                token,
                user: {
                    username    : user.username,
                    email: user.email,
                    role: user.role,
                    img: user.img // Sertakan path gambar dalam respons
                }
            });
        });
    });
};

export const forgotPassword = (req, res) => {
    const { username, email, newPassword } = req.body;

    User.findByUsername(username, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];

        if (user.email !== email) {
            return res.status(400).json({ message: 'Email does not match' });
        }

        // Hash the new password
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing new password:', err);
                return res.status(500).json({ message: 'Error hashing new password', error: err });
            }

            // Update the user's password
            User.updatePassword(user.id, hashedPassword, (err) => {
                if (err) {
                    console.error('Error updating password:', err);
                    return res.status(500).json({ message: 'Error updating password', error: err });
                }

                res.json({ message: 'Password updated successfully' });
            });
        });
    });
};