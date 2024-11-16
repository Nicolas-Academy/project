// models/project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // El nombre es obligatorio
    descripcion: { type: String }, // La descripción es opcional
    fechaInicio: { type: Date }, // La fecha de inicio es opcional
    fechaFin: { type: Date }, // La fecha de fin es opcional
    userId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true // Este campo es obligatorio para asegurar que cada proyecto tenga un usuario asociado
   }
});

// Crear el modelo a partir del esquema y exportarlo.
module.exports = mongoose.model('Project', projectSchema);