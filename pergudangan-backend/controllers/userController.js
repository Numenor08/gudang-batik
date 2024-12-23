import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkAdminRole } from '../middleware/roleMiddleware.js';
import fs from 'fs';
import path from 'path';
import { logActivity } from './logController.js';
import { addRefreshToken, findRefreshToken, deleteRefreshToken } from '../models/refreshTokenModel.js';
import Log from '../models/Log.js';

export const getAllUser = [checkAdminRole, (req, res) => {
    User.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data', error: err });
        }
        res.json(result);
    });
}];

export const getUserById = (req, res) => {
    const { id } = req.params;

    User.findById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            id: result[0].id,
            username: result[0].username,
            role: result[0].role,
            email: result[0].email,
            img: result[0].img
        });
    });
}

export const getImgById = (req, res) => {
    const { id } = req.params;

    User.getImgById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user image', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result[0].img);
    }
);}

export const registerUser = (req, res) => {
    const { username, password, role, email } = req.body;
    const img = req.file ? req.file.path : null;

    User.findByUsername(username, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error checking username', error: err });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password', error: err });
            }

            const userData = { username, password: hashedPassword, role, email, img };

            User.create(userData, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error creating user', error: err });
                }

                res.status(201).json({
                    message: 'User created successfully',
                    user: {
                        username: username,
                        email: email,
                        role: role,
                        img: img
                    }
                });
            });
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

        bcrypt.compare(password, user.password, async (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords', error: err });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid Password' });
            }

            const accessToken = jwt.sign({ data: { userId: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ data: { userId: user.id, role: user.role } }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

            await addRefreshToken(user.id, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
            res.json({
                message: 'Login successful',
                accessToken,
                user: {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    img: user.img
                }
            });
        });
    });
};

export const logoutUser = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(403).json({ message: 'No refresh token provided' });
    }

    try {
        await deleteRefreshToken(refreshToken);
        res.clearCookie('refreshToken');
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Error logging out', error });
    }
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

export const updateUser = (req, res) => {
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
                    logActivity(req.user.userId, `Updated User with ID ${id}`);
                    res.json({ message: 'User data updated successfully', img: img });
                });
            } else {
                logActivity(req.user.userId, `Updated User with ID ${id}`);
                res.json({ message: 'User data updated successfully', img: img || oldImgPath });
            }
        });
    });
};

export const updateUserWithPassword = (req, res) => {
    const { id } = req.params;
    const { username, role, email, password } = req.body; // password adalah password baru
    const img = req.file ? req.file.path : null;

    User.findById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];

        // Hash password baru
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password', error: err });
            }

            const updatedData = { username, role, email, password: hashedPassword, img: img || user.img };

            User.updateUserWithPassword(id, updatedData, async (err, updatedResult) => {
                if (err) {
                    return res.status(500).json({ message: 'Error updating user data', error: err });
                }
                if (updatedResult.affectedRows === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.json({ message: 'User data updated successfully', img: img || user.img });
            });
        });
    });
};

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

        // Hapus log terkait
        Log.deleteByUserId(id, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting user logs', error: err });
            }

            User.delete(id, (err, deleteResult) => {
                if (err) {
                    return res.status(500).json({ message: 'Error deleting user', error: err });
                }
                if (deleteResult.affectedRows === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }

                if (imgPath) {
                    const fullPath = path.resolve(imgPath);
                    fs.unlink(fullPath, (unlinkErr) => {
                        if (unlinkErr) {
                            return res.status(500).json({ message: 'Error deleting user image', error: unlinkErr });
                        }

                        logActivity(req.user.userId, `Deleted User with ID ${id}`);
                        res.json({ message: 'User deleted successfully' });
                    });
                } else {
                    logActivity(req.user.userId, `Deleted User with ID ${id}`);
                    res.json({ message: 'User deleted successfully' });
                }
            });
        });
    });
}];

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        // Tidak ada refresh token dikirimkan
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    try {
        // Cek apakah refresh token ada di database
        const tokenData = await findRefreshToken(refreshToken);

        if (!tokenData) {
            // Refresh token tidak ditemukan di database
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        // Verifikasi refresh token menggunakan JWT
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                // Jika JWT gagal diverifikasi
                await deleteRefreshToken(refreshToken);
                return res.status(401).json({ message: 'Refresh token expired or invalid' });
            }

            // Ambil userId dari payload token
            const userId = decoded.data.userId;
            const userRole = decoded.data.role;

            // Buat access token baru
            const newAccessToken = jwt.sign({ data: { userId: userId, role: userRole } }, process.env.JWT_SECRET, { expiresIn: '15m' });


            // Kirim access token baru ke klien
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};