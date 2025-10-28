const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createScan, getScansByBombona } = require('../controllers/scanController');

router.post('/', auth, createScan); // bipagem
router.get('/bombona/:uuid', auth, getScansByBombona);

module.exports = router;
