// src/controllers/gruposController.js
const Grupo = require('../models/grupo');

async function crearGrupo(req, res) {
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

module.exports = { crearGrupo, obtenerGruposPorUsuario };
