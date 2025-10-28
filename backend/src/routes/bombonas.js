const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createBombona, listBombonas, getBombonaByUuid } = require('../controllers/bombonaController');

router.post('/', auth, createBombona);
router.get('/', auth, listBombonas);
router.get('/uuid/:uuid', auth, getBombonaByUuid);

module.exports = router;
