const pool = require('../config/database');

class Gasto {
    constructor(usuarioId, grupoId, categoriaId, fecha, monto, descripcion) {
        this.usuarioId = usuarioId;
        this.grupoId = grupoId;
        this.categoriaId = categoriaId;
        this.fecha = fecha;
        this.monto = monto;
        this.descripcion = descripcion;
    }

    async guardar() {
        const [result] = await pool.query('INSERT INTO Gastos (UsuarioID, GrupoID, CategoriaID, Fecha, Monto, Descripcion) VALUES (?, ?, ?, ?, ?, ?)', [this.usuarioId, this.grupoId, this.categoriaId, this.fecha, this.monto, this.descripcion]);
        return result;
    }

    static async obtenerPorUsuario(usuarioId) {
        const [gastos] = await pool.query('SELECT * FROM Gastos WHERE UsuarioID = ?', [usuarioId]);
        return gastos;
    }
}

module.exports = Gasto;
