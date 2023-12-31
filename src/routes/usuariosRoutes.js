const express = require('express');
const { registrarUsuario, autenticarUsuario, obtenerSaldo } = require('../controllers/usuariosController');
const router = express.Router();

router.post('/registrar', registrarUsuario);
router.post('/autenticar', autenticarUsuario);
router.get('/saldo/:usuarioId', obtenerSaldo);

module.exports = router;
