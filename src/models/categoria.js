const pool = require('../config/database');

class Categoria {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    async guardar() {
        const [result] = await pool.query('INSERT INTO Categorias (Nombre, Descripcion) VALUES (?, ?)', [this.nombre, this.descripcion]);
        return result;
    }

    static async obtenerTodas() {
        const [categorias] = await pool.query('SELECT * FROM Categorias');
        return categorias;
    }
}

module.exports = Categoria;
