import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import logRoutes from './routes/logRoutes.js';
import batikRoutes from './routes/batikRoutes.js';
import distributorRoutes from './routes/distributorRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import { verifyToken } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

// Konfigurasi CORS
app.use(cors({
    origin: "*", // Ganti dengan URL frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/transactions', verifyToken, transactionRoutes);
app.use('/api/logs', verifyToken, logRoutes);
app.use('/api/batik', verifyToken, batikRoutes);
app.use('/api/distributors', verifyToken, distributorRoutes);
app.use('/api/suppliers', verifyToken, supplierRoutes);
app.use('/api/categories', verifyToken, categoryRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});