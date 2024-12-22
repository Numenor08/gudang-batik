import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkAdminRole } from '../middleware/roleMiddleware.js';
import fs from 'fs';
import path from 'path';
import { logActivity } from './logController.js';

export const getAllUser = [checkAdminRole, (req, res) => {
    User.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data', error: err });
        }
        res.json(result);
    });
}];

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
                    username: user.username,
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

export const updateUser = [checkAdminRole, (req, res) => {
    const { id } = req.params;
    const { username, role, email } = req.body;
    const img = req.file ? req.file.path : null;

    User.findById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const oldImgPath = result[0].img;
        const updatedData = { username, role, email };
        if (img) {
            updatedData.img = img;
        } else {
            updatedData.img = oldImgPath;
        }

        User.updateUser(id, updatedData, (err, updatedResult) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating user data', error: err });
            }
            if (updatedResult.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (img && oldImgPath) {
                const fullPath = path.resolve(oldImgPath);
                fs.unlink(fullPath, (unlinkErr) => {
                    if (unlinkErr) {
                        return res.status(500).json({ message: 'Error deleting old user image', error: unlinkErr });
                    }
                    logActivity(req.user.userID, `Updated User with ID ${id}`);
                    res.json({ message: 'User data updated successfully', img: img });
                });
            } else {
                logActivity(req.user.userID, `Updated User with ID ${id}`);
                res.json({ message: 'User data updated successfully', img: img || oldImgPath });
            }
        });
    });
}];

export const deleteUser = [checkAdminRole, (req, res) => {
    const { id } = req.params;

    User.findById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const imgPath = result[0].img;

        User.deleteUser(id, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting user', error: err });
            }
            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Batik not found' });
            }

            if (imgPath) {
                const fullPath = path.resolve(imgPath);
                fs.unlink(fullPath, (unlinkErr) => {
                    if (unlinkErr) {
                        return res.status(500).json({ message: 'Error deleting batik image', error: unlinkErr });
                    }

                    logActivity(req.user.userID, `Deleted Batik with ID ${batikId}`);
                    res.json({ message: 'Batik deleted successfully' });
                });
            } else {
                logActivity(req.user.userID, `Deleted Batik with ID ${batikId}`);
                res.json({ message: 'Batik deleted successfully' });
            }
        });
    })
}]