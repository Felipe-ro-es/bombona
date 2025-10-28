const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { listLocations, createLocation } = require('../controllers/locationController');

router.get('/', auth, listLocations);
router.post('/', auth, createLocation);

module.exports = router;
