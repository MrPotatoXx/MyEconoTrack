const express = require('express');
const { crearCategoria, obtenerCategorias } = require('../controllers/categoriasController');
const router = express.Router();

router.post('/crear', crearCategoria);

router.get('/', obtenerCategorias);

module.exports = router;
