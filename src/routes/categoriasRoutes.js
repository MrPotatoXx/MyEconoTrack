const express = require('express');
const { crearCategoria, obtenerCategorias, crearCategoriaValidaciones } = require('../controllers/categoriasController');
const router = express.Router();

router.post('/crear', crearCategoriaValidaciones, crearCategoria);

router.get('/', obtenerCategorias);

module.exports = router;
