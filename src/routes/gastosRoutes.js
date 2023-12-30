const express = require('express');
const { crearGasto, obtenerGastosPorUsuario } = require('../controllers/gastosController');
const router = express.Router();

router.post('/crear', crearGasto);
router.get('/usuario/:usuarioId', obtenerGastosPorUsuario);

module.exports = router;
