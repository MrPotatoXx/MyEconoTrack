const express = require('express');
const { crearGrupo, obtenerGruposPorUsuario, crearGrupoValidaciones } = require('../controllers/gruposController');
const verificarToken = require('../middleware/verificarToken');
const router = express.Router();

router.post('/crear', verificarToken, crearGrupoValidaciones, crearGrupo);
router.get('/usuario/:creadorId', verificarToken, obtenerGruposPorUsuario);

module.exports = router;
