class Category {
  constructor(id, name, description, created_at, updated_at) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Static method to create a new category
  static create(db, data, callback) {
    const { name, description } = data;
    const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
    db.query(query, [name, description], callback);
  }

  // Static method to get all categories
  static getAll(db, callback) {
    const query = 'SELECT * FROM categories';
    db.query(query, callback);
  }

  // Static method to get category by ID
  static getById(db, id, callback) {
    const query = 'SELECT * FROM categories WHERE id = ?';
    db.query(query, [id], callback);
  }

  // Static method to update a category
  static update(db, id, data, callback) {
    const { name, description } = data;
    const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, id], callback);
  }

  // Static method to delete a category
  static delete(db, id, callback) {
    const query = 'DELETE FROM categories WHERE id = ?';
    db.query(query, [id], callback);
  }
}

export default Category;