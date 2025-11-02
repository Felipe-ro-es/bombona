const express = require('express');
const router = express.Router();
const bombonaController = require('../controllers/bombonaController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // protege todas as rotas abaixo

router.post('/', bombonaController.createBombona);
router.get('/', bombonaController.getAllBombonas);
router.put('/:id/status', bombonaController.updateStatus);
router.delete('/:id', bombonaController.deleteBombona);
router.put('/local', bombonaController.updateLocal);
router.get('/:bombonaId/qrcode', bombonaController.generateQRCode);


module.exports = router;
