
// middleware/auth.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No se proporcionó token o el formato es incorrecto" });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token no válido o no autorizado" });
        }
        
        req.user = user; // Almacenar la información del usuario en la solicitud
        next(); // Pasar al siguiente middleware o ruta
    });
};

module.exports = authenticateJWT;