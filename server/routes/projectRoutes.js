// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const projectControllers = require('../controllers/projectControllers'); 
const authMiddleware = require('../middleware/authMiddleware'); // Importar el middleware

// Rutas de proyectos utilizando la instancia del router.
router.get("/", authMiddleware, projectControllers.fetchProjects); // Listar todos los proyectos.
router.get("/:id", authMiddleware, projectControllers.fetchProject); // Obtener un proyecto específico por ID.
router.post("/", authMiddleware, projectControllers.createProject); // Crear un nuevo proyecto.
router.put("/:id", authMiddleware, projectControllers.updateProject); // Actualizar un proyecto específico por ID.
router.delete("/:id", authMiddleware, projectControllers.deleteProject); // Eliminar un proyecto específico por ID.

// Exportar el router.
module.exports = router;