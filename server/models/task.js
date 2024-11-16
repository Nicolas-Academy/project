// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Asegúrate de que 'Project' sea el nombre correcto del modelo.
        required: true // Hacer este campo obligatorio.
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        optional: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'en progreso', 'completada'],
        required: true
    },
    priority: {
        type: Number,
        min: 1,
        max: 5,
        optional: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;