const express = require('express');
const { crearGasto, crearGastoValidaciones, obtenerGastosPorUsuario } = require('../controllers/gastosController');
const verificarToken = require('../middleware/verificarToken');
const router = express.Router();

router.post('/crear', verificarToken, crearGastoValidaciones, crearGasto);
router.get('/usuario/:usuarioId', verificarToken, obtenerGastosPorUsuario);

module.exports = router;
