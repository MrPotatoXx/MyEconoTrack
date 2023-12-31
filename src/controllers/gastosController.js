const Gasto = require('../models/gasto');
const Usuario = require('../models/usuario');
const pool = require('../config/database');
const { body, validationResult } = require('express-validator');

const crearGastoValidaciones = [
    body('usuarioId').isInt().withMessage('ID de usuario debe ser un número entero'),
    body('grupoId').optional({ nullable: true, checkFalsy: true }).isInt().withMessage('ID de grupo debe ser un número entero'),
    body('categoriaId').isInt().withMessage('ID de categoría debe ser un número entero'),
    body('fecha').isISO8601().withMessage('La fecha debe estar en formato ISO 8601'),
    body('monto').isDecimal().withMessage('El monto debe ser un número decimal'),
    body('descripcion').trim().not().isEmpty().withMessage('La descripción es requerida')
];

async function crearGasto(req, res) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { usuarioId, grupoId, categoriaId, fecha, monto, descripcion } = req.body;
        const gasto = new Gasto(usuarioId, grupoId, categoriaId, fecha, monto, descripcion);
        await gasto.guardar(connection);

        const usuario = new Usuario(null, null, null, usuarioId);
        await usuario.actualizarSaldo(monto, connection);

        await connection.commit();
        res.status(201).send({ message: 'Gasto creado con éxito' });
    } catch (error) {
        await connection.rollback();
        res.status(500).send({ message: 'Error al crear el gasto', error });
    } finally {
        connection.release();
    }
}

async function obtenerGastosPorUsuario(req, res) {
    try {
        const { usuarioId } = req.params;
        const gastos = await Gasto.obtenerPorUsuario(usuarioId);

        res.send(gastos);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los gastos', error });
    }
}
module.exports = { crearGasto, crearGastoValidaciones, obtenerGastosPorUsuario };