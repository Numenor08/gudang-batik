import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Example: User authentication for login
export const login = async (req, res) => {
    const { username, password } = req.body;

    // Simulate getting user from DB
    const user = { id: 1, username: 'admin', password: '$2b$10$examplehashedpassword' }; // Hash password in DB

    // Check if password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};
