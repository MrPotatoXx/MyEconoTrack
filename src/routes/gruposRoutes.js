const express = require('express');
const { crearGrupo, obtenerGruposPorUsuario, crearGrupoValidaciones } = require('../controllers/gruposController');
const router = express.Router();

router.post('/crear', crearGrupoValidaciones, crearGrupo);
router.get('/usuario/:creadorId', obtenerGruposPorUsuario);

module.exports = router;
