const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'No se proporcionó token de autenticación.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'No autorizado.' });
    }
};

module.exports = verificarToken;
