const { body, validationResult } = require('express-validator');

const crearCategoriaValidaciones = [
    body('nombre').trim().escape().not().isEmpty().withMessage('El nombre de la categoría es requerido'),
    body('descripcion').trim().escape().optional()
];

async function crearCategoria(req, res) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    try {
        const { nombre, descripcion } = req.body;
        const categoria = new Categoria(nombre, descripcion);
        await categoria.guardar();

        res.status(201).send({ message: 'Categoría creada con éxito' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear la categoría', error });
    }
}

async function obtenerCategorias(req, res) {
    try {
        const categorias = await Categoria.obtenerTodas();
        res.send(categorias);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener las categorías', error });
    }
}

module.exports = { crearCategoria, obtenerCategorias, crearCategoriaValidaciones };
