const express = require('express');
const { registrarUsuario, registrarUsuarioValidaciones, autenticarUsuario, obtenerSaldo } = require('../controllers/usuariosController');
const router = express.Router();

router.post('/registrar', registrarUsuarioValidaciones, registrarUsuario);
router.post('/autenticar', autenticarUsuario);
router.get('/saldo/:usuarioId', obtenerSaldo);

module.exports = router;
