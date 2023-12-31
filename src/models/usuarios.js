const pool = require('../config/database');
const bcrypt = require('bcrypt');

class Usuario {
    constructor(nombre, correoElectronico, contraseña) {
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.contraseña = contraseña;
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

    async actualizarSaldo(monto) {
        const [usuario] = await pool.query('SELECT Saldo FROM Usuarios WHERE UsuarioID = ?', [this.UsuarioID]);
        const saldoActual = usuario[0].Saldo;

        const nuevoSaldo = saldoActual - monto;
        await pool.query('UPDATE Usuarios SET Saldo = ? WHERE UsuarioID = ?', [nuevoSaldo, this.UsuarioID]);
    }

    static async obtenerSaldo(usuarioId) {
        const [usuario] = await pool.query('SELECT Saldo FROM Usuarios WHERE UsuarioID = ?', [usuarioId]);
        return usuario[0].Saldo;
    }
}

module.exports = Usuario;
