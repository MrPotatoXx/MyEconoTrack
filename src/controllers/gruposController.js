const { body, validationResult } = require('express-validator');
const Grupo = require('../models/grupo');

const crearGrupoValidaciones = [
    body('nombre').trim().escape().not().isEmpty().withMessage('El nombre del grupo es requerido'),
    body('descripcion').trim().escape().optional(),
    body('creadorId').isInt().withMessage('El ID del creador debe ser un número entero')
];

async function crearGrupo(req, res) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const { nombre, descripcion, creadorId } = req.body;
        const grupo = new Grupo(nombre, descripcion, creadorId);
        await grupo.guardar();
        res.status(201).send({ message: 'Grupo creado con éxito', grupoId: grupo.id });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el grupo', error });
    }
}

async function obtenerGruposPorUsuario(req, res) {
    try {
        const { creadorId } = req.params;
        const grupos = await Grupo.obtenerPorUsuario(creadorId);
        res.send(grupos);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los grupos', error });
    }
}

module.exports = { crearGrupo, obtenerGruposPorUsuario, crearGrupoValidaciones };
