const Gasto = require('../models/gasto');


async function obtenerGastosPorUsuario(req, res) {
    try {
        const { usuarioId } = req.params;
        const gastos = await Gasto.obtenerPorUsuario(usuarioId);

        res.send(gastos);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los gastos', error });
    }
}
async function crearGasto(req, res) {
    try {
        const { usuarioId, grupoId, categoriaId, fecha, monto, descripcion } = req.body;
        const gasto = new Gasto(usuarioId, grupoId, categoriaId, fecha, monto, descripcion);
        await gasto.guardar();

        const usuario = new Usuario(usuarioId);
        await usuario.actualizarSaldo(monto);

        res.status(201).send({ message: 'Gasto creado con éxito' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el gasto', error });
	}
}
module.exports = { crearGasto, obtenerGastosPorUsuario };
