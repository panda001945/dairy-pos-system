const db = require('../config/db');

// Process a Sale
exports.processSale = (req, res) => {
  const { product_id, quantity } = req.body;
  db.get(`SELECT price, stock FROM products WHERE id = ?`, [product_id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    const totalPrice = product.price * quantity;

    db.run(`INSERT INTO sales (product_id, quantity, total_price, date) VALUES (?, ?, ?, ?)`,
      [product_id, quantity, totalPrice, new Date().toISOString()],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.run(`UPDATE products SET stock = stock - ? WHERE id = ?`, [quantity, product_id], function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.status(201).json({ id: this.lastID, total_price: totalPrice });
        });
      });
  });
};

// Get All Sales
exports.getSales = (req, res) => {
  db.all(`SELECT * FROM sales`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ sales: rows });
  });
};
