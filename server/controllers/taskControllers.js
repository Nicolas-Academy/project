// controllers/taskControllers.js
const Task = require("../models/task");

// Obtener todas las tareas de un proyecto específico (opcional)
const fetchTasks = async (req, res) => {
    const { proyectoId } = req.params; // Asegúrate de recibir el proyectoId

    try {
        const tasks = await Task.find(proyectoId ? { projectId: proyectoId } : {}); // Filtrar por proyecto si se proporciona
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ error: 'Error al obtener las tareas.' });
    }
};

// Obtener una tarea específica por ID
const fetchTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId); // Buscar la tarea por su ID
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }
        res.status(200).json({ task });
    } catch (error) {
        console.error('Error al obtener la tarea:', error);
        res.status(500).json({ error: 'Error al obtener la tarea.' });
    }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    const { projectId, title, description, status, priority } = req.body; // Asegúrate de recibir projectId

    if (!projectId || !title || !status) {
        return res.status(400).json({ error: 'El projectId, título y estado son requeridos.' });
    }

    try {
        const task = await Task.create({ projectId, title, description, status, priority }); // Crear tarea con projectId
        res.status(201).json({ task });
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error al crear la tarea.' });
    }
};

// Actualizar una tarea existente
const updateTask = async (req, res) => { 
    const taskId = req.params.id;
    const { projectId, title, description, status, priority } = req.body; // Asegúrate de recibir projectId

    try {
        const task = await Task.findByIdAndUpdate(taskId, { projectId, title, description, status, priority }, { new: true });

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }

        res.status(200).json({ task });
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ error: 'Error al actualizar la tarea.' });
    }
};

// Eliminar una tarea existente
const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const result = await Task.deleteOne({ _id: taskId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Tarea no encontrada." });
        }

        res.status(200).json({ success: "Tarea eliminada." });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ error: 'Error al eliminar la tarea.' });
    }
};

// Exportar las funciones del controlador
module.exports = {
    fetchTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask
};