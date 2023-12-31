const express = require('express');
const { crearGasto, crearGastoValidaciones, obtenerGastosPorUsuario } = require('../controllers/gastosController');
const router = express.Router();

router.post('/crear', crearGastoValidaciones, crearGasto);
router.get('/usuario/:usuarioId', obtenerGastosPorUsuario);

module.exports = router;
