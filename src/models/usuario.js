// src/models/usuario.js
const pool = require('../config/database');
const bcrypt = require('bcrypt');

class Usuario {
    constructor(nombre, correoElectronico, contraseña, usuarioId = null) {
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.contraseña = contraseña;
        this.usuarioId = usuarioId;
    }

    async guardar() {
        const hashedPassword = await bcrypt.hash(this.contraseña, 10);
        const [result] = await pool.query('INSERT INTO Usuarios (Nombre, CorreoElectronico, Contraseña) VALUES (?, ?, ?)', [this.nombre, this.correoElectronico, hashedPassword]);
        return result;
    }

    static async buscarPorCorreo(correoElectronico) {
        const [users] = await pool.query('SELECT * FROM Usuarios WHERE CorreoElectronico = ?', [correoElectronico]);
        return users[0];
    }

    async actualizarSaldo(monto, connection) {
        const [usuario] = await connection.query('SELECT Saldo FROM Usuarios WHERE UsuarioID = ?', [this.usuarioId]);
        const saldoActual = usuario[0].Saldo;
        const nuevoSaldo = saldoActual - monto;

        await connection.query('UPDATE Usuarios SET Saldo = ? WHERE UsuarioID = ?', [nuevoSaldo, this.usuarioId]);
        await connection.query('INSERT INTO HistorialSaldo (UsuarioID, Cambio, SaldoDespues) VALUES (?, ?, ?)', [this.usuarioId, -monto, nuevoSaldo]);
    }
}

module.exports = Usuario;
