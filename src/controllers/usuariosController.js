const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const secretKey = process.env.SECRET_KEY;

const registrarUsuarioValidaciones = [
    body('nombre').trim().not().isEmpty().withMessage('El nombre es requerido'),
    body('correoElectronico').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

async function registrarUsuario(req, res) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const { nombre, correoElectronico, contraseña } = req.body;
        const usuario = new Usuario(nombre, correoElectronico, contraseña);
        await usuario.guardar();

        res.status(201).send({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).send({ message: 'Error al registrar el usuario', error });
    }
}

async function autenticarUsuario(req, res) {
    try {
        const { correoElectronico, contraseña } = req.body;
        const usuario = await Usuario.buscarPorCorreo(correoElectronico);

        if (usuario && await bcrypt.compare(contraseña, usuario.Contraseña)) {
            const token = jwt.sign({ userId: usuario.UsuarioID, correoElectronico: usuario.CorreoElectronico }, secretKey, { expiresIn: '24h' });
            res.send({ message: 'Autenticación exitosa', token });
        } else {
            res.status(401).send({ message: 'Correo electrónico o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al autenticar el usuario', error });
    }
}

async function obtenerSaldo(req, res) {
    try {
        const { usuarioId } = req.params;
        const saldo = await Usuario.obtenerSaldo(usuarioId);

        res.send({ saldo });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el saldo', error });
    }
}

module.exports = { registrarUsuario, autenticarUsuario, obtenerSaldo, registrarUsuarioValidaciones };
