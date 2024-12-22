import db from '../config/db.js';

class Batik {
    static create(data, callback) {
        const { name, color, size, stock, min_stock, img, category_id } = data;
        const query = 'INSERT INTO batik (name, color, size, stock, min_stock, img, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [name, color, size, stock, min_stock, img, category_id], callback);
    }

    // static getAll(callback) {
    //     const query = 'SELECT * FROM batik';
    //     db.query(query, callback);
    // }

    static getAll(callback) {
        const query = `
            SELECT batik.*, categories.name as category_name 
            FROM batik 
            LEFT JOIN categories ON batik.category_id = categories.id
        `;
        db.query(query, callback);
    }

    static getMostStockbyCategory(callback) {
        const query = `SELECT c.name, SUM(b.stock) AS total_stock FROM categories c JOIN batik b ON c.id = b.category_id GROUP BY c.id, c.name ORDER BY total_stock DESC LIMIT 1;`;
        db.query(query, callback);
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM batik WHERE id = ?';
        db.query(query, [id], callback);
    }

    static update(id, data, callback) {
        const { name, color, size, stock, min_stock, img, category_id } = data;
        const query = 'UPDATE batik SET name = ?, color = ?, size = ?, stock = ?, min_stock = ?, img = ?, category_id = ? WHERE id = ?';
        db.query(query, [name, color, size, stock, min_stock, img, category_id, id], callback);
    }

    static delete(id, callback) {
        const query = 'DELETE FROM batik WHERE id = ?';
        db.query(query, [id], callback);
    }

    static getTotalStock(callback) {
        const query = 'SELECT SUM(stock) as total_stock FROM batik';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(null, [{ total_stock: 0 }]);
            }
            callback(null, results);
        });
    }

    static getTopBatik(callback) {
        const query = `
            SELECT id, name, stock 
            FROM batik 
            ORDER BY stock DESC 
            LIMIT 7
        `;
        db.query(query, (err, top5Results) => {
            if (err) {
                return callback(err, null);
            }
            const totalStockQuery = 'SELECT SUM(stock) as total_stock FROM batik';
            db.query(totalStockQuery, (err, totalStockResults) => {
                if (err) {
                    return callback(err, null);
                }
                const totalStock = totalStockResults[0].total_stock;
                const top5Stock = top5Results.reduce((acc, batik) => acc + batik.stock, 0);
                const remainingStock = totalStock - top5Stock;
                top5Results.push({ id: null, name: 'Others', stock: remainingStock });
                callback(null, top5Results);
            });
        });
    }
}

export default Batik;