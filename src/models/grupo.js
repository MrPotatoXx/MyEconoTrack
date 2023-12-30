const pool = require('../config/database');

class Grupo {
    constructor(nombre, descripcion, creadorId) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.creadorId = creadorId;
    }

    async guardar() {
        const [result] = await pool.query('INSERT INTO Grupos (Nombre, Descripcion, CreadorID) VALUES (?, ?, ?)', [this.nombre, this.descripcion, this.creadorId]);
        return result;
    }

    static async obtenerPorUsuario(usuarioId) {
        const [grupos] = await pool.query('SELECT * FROM Grupos WHERE CreadorID = ?', [usuarioId]);
        return grupos;
    }
}

module.exports = Grupo;
