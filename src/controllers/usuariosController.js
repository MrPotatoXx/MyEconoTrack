const Usuario = require('../models/usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const secretKey = process.env.SECRET_KEY;

async function registrarUsuario(req, res) {
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

module.exports = { registrarUsuario, autenticarUsuario };
