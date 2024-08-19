const db = require('../config/db');

// Add a Product
exports.addProduct = (req, res) => {
  const { name, price, stock } = req.body;
  db.run(`INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`,
    [name, price, stock],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
};

// Get All Products
exports.getProducts = (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ products: rows });
  });
};
