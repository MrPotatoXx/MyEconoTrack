const express = require('express');
const { registrarUsuario, autenticarUsuario } = require('../controllers/usuariosController');
const router = express.Router();

router.post('/registrar', registrarUsuario);
router.post('/autenticar', autenticarUsuario);

module.exports = router;
