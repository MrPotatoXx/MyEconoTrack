require('dotenv').config();

const express = require('express');
const usuariosRoutes = require('./routes/usuariosRoutes');
const gastosRoutes = require('./routes/gastosRoutes');
const gruposRoutes = require('./routes/gruposRoutes');
const categoriaRoutes = require('./routes/categoriasRoutes');
const app = express();

app.use(express.json()); // Middleware para parsear JSON

const PORT = process.env.PORT; // Añade un puerto predeterminado por si acaso

app.use('/usuarios', usuariosRoutes);
app.use('/gastos', gastosRoutes);
app.use('/grupos', gruposRoutes);
app.use('/categorias', categoriaRoutes);

app.listen(PORT, () => {
   console.log(`Servidor corriendo en el puerto ${PORT}`);
});
