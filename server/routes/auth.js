// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rutas de autenticación
router.post("/register", authController.registerUser); // Registro de usuario
router.post("/login", authController.loginUser); // Inicio de sesión de usuario

// Exportar el router
module.exports = router;

