// src/routes/gruposRoutes.js
const express = require('express');
const { crearGrupo, obtenerGruposPorUsuario } = require('../controllers/gruposController');
const router = express.Router();

router.post('/crear', crearGrupo);
router.get('/usuario/:creadorId', obtenerGruposPorUsuario);

module.exports = router;
