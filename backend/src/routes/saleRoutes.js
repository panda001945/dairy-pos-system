const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.post('/', saleController.processSale);
router.get('/', saleController.getSales);

module.exports = router;
