const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

app.get('/', (req, res) => {
  res.send('Dairy POS System Backend');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
