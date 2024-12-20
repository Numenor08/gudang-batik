import Log from '../models/Log.js';

export const logActivity = (userId, action) => {
    const logData = { user_id: userId, action };
    Log.create(logData, (err) => {
        if (err) {
            console.error('Error logging activity:', err);
        }
    });
};

export const getAllLogs = (req, res) => {
    Log.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching logs', error: err });
        }
        res.json(result);
    });
};