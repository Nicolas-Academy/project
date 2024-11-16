// controllers/projectControllers.js
const Project = require("../models/project"); // Asegúrate de que la ruta al modelo sea correcta

// Obtener todos los proyectos del usuario autenticado
const fetchProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id }); // Filtrar por usuario
        res.status(200).json({ projects });
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        res.status(500).json({ error: 'Error al obtener los proyectos.' });
    }
};

// Obtener un proyecto específico por ID
const fetchProject = async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await Project.findOne({ _id: projectId, userId: req.user.id }); // Filtrar por usuario
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado.' });
        }
        res.json({ project });
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ error: 'Error al obtener el proyecto.' });
    }
};

// Crear un nuevo proyecto
const createProject = async (req, res) => {
    const { nombre, descripcion, fechaInicio, fechaFin } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido.' });
    }

    try {
        const project = await Project.create({ 
            nombre, 
            descripcion, 
            fechaInicio, 
            fechaFin, 
            userId: req.user.id // Guardar el ID del usuario
        });
        res.status(201).json({ project });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ error: 'Error al crear el proyecto.' });
    }
};

// Actualizar un proyecto específico por ID
const updateProject = async (req, res) => { 
    const projectId = req.params.id;
    const { nombre, descripcion, fechaInicio, fechaFin } = req.body;

    try {
        const project = await Project.findOneAndUpdate(
            { _id: projectId, userId: req.user.id }, // Filtrar por usuario
            { nombre, descripcion, fechaInicio, fechaFin },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado.' });
        }

        res.status(200).json({ project });
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        res.status(500).json({ error: 'Error al actualizar el proyecto.' });
    }
};

// Eliminar un proyecto específico por ID
const deleteProject = async (req, res) => {
    const projectId = req.params.id;

    try {
        const result = await Project.deleteOne({ _id: projectId, userId: req.user.id }); // Filtrar por usuario

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Proyecto no encontrado." });
        }

        res.status(200).json({ success: "Proyecto eliminado." });
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        res.status(500).json({ error: 'Error al eliminar el proyecto.' });
    }
};

// Exportar las funciones del controlador
module.exports = {
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject
};