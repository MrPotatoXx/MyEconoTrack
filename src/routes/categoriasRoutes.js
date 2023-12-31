const express = require('express');
const { crearCategoria, obtenerCategorias, crearCategoriaValidaciones } = require('../controllers/categoriasController');
const verificarToken = require('../middleware/verificarToken');
const router = express.Router();

router.post('/crear', verificarToken, crearCategoriaValidaciones, crearCategoria);
router.get('/', verificarToken, obtenerCategorias);

module.exports = router;
