require('dotenv').config();

const express = require('express');
const usuariosRoutes = require('./routes/usuariosRoutes');
const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Define rutas aquí

const PORT = process.env.PORT;

app.use('/usuarios', usuariosRoutes);

app.listen(PORT, () => {
   console.log(`Servidor corriendo en el puerto ${PORT}`);
   console.log(process.env.SECRET_KEY)
});
