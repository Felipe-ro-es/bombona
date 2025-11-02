const express = require('express');
const router = express.Router();
const localController = require('../controllers/localController');
const authMiddleware = require('../middleware/authMiddleware'); 
// protege as rotas

router.use(authMiddleware);

// Criar novo local
router.post('/', localController.createLocal);

// Listar todos os locais
router.get('/', localController.getAllLocais);

module.exports = router;
