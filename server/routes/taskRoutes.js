// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/taskControllers"); 
const authMiddleware = require('../middleware/authMiddleware'); // Importar el middleware

// Rutas de tareas utilizando la instancia del router.
router.post("/", authMiddleware, taskControllers.createTask); // Crear una nueva tarea.
router.get("/:proyectoId?", authMiddleware, taskControllers.fetchTasks); // Listar todas las tareas de un proyecto específico (opcional).
router.get("/:id", authMiddleware, taskControllers.fetchTask); // Obtener una tarea específica por ID.
router.put("/:id", authMiddleware, taskControllers.updateTask); // Actualizar una tarea existente por ID.
router.delete("/:id", authMiddleware, taskControllers.deleteTask); // Eliminar una tarea existente por ID.

// Exportar el router.
module.exports = router;