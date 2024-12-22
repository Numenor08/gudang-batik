import db from '../config/db.js';

class Transaction {
    static create(data, callback) {
        const { batik_id, user_id, type, quantity, supplier_id, distributor_id } = data;
        const query = 'INSERT INTO transactions (batik_id, user_id, type, quantity, supplier_id, distributor_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [batik_id, user_id, type, quantity, supplier_id, distributor_id], callback);
    }

    static getAll(callback) {
        
        const query = `SELECT transactions.*, 

            COALESCE(suppliers.name, distributors.name) AS name, 

            COALESCE(suppliers.contact_person, distributors.contact_person) AS contact_person,

            batik.name AS batik_name

        FROM transactions

        LEFT JOIN suppliers ON transactions.supplier_id = suppliers.id

        LEFT JOIN distributors ON transactions.distributor_id = distributors.id

        LEFT JOIN batik ON transactions.batik_id = batik.id`;

        db.query(query, callback);
    }

    static getLast7DaysTransactions(callback) {
        const query = `
            -- Membuat rentang hari
WITH days AS (
    SELECT 
        CURDATE() - INTERVAL n DAY AS day
    FROM 
        (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 
         UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6) numbers
)
SELECT 
    DATE_FORMAT(days.day, '%W') AS day,
    COALESCE(SUM(CASE WHEN transactions.type = 'in' THEN transactions.quantity ELSE 0 END), 0) AS incoming,
    COALESCE(SUM(CASE WHEN transactions.type = 'out' THEN transactions.quantity ELSE 0 END), 0) AS outgoing
FROM 
    days
LEFT JOIN 
    transactions ON DATE(transactions.created_at) = days.day
GROUP BY 
    days.day
ORDER BY 
    days.day ASC
LIMIT 0, 25;

        `;

        db.query(query, callback);
    }
    
    static getTransactionToday(callback) {
        const query = `SELECT COUNT(*) AS transaction FROM transactions WHERE DATE(created_at) = CURDATE()`;
        db.query(query, callback);
    }
}

export default Transaction;