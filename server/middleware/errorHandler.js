// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Imprimir el error en la consola

    // Enviar una respuesta de error
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Error interno del servidor.',
        },
    });
};

module.exports = errorHandler;