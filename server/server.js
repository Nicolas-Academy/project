// server.js
require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const connectToDb = require("./connectTODb"); 


// Importar módulos de rutas.
const projectRoutes = require("./routes/projectRoutes"); 
const taskRoutes = require("./routes/taskRoutes"); 
const authRoutes = require("./routes/auth"); 

// Importar el middleware de manejo de errores.
const errorHandler = require("./middleware/errorHandler"); 

// Crear una aplicación Express.
const app = express();

// Configurar la aplicación Express.
app.use(express.json()); 
app.use(cors()); 

// Conectar a la base de datos.
connectToDb(); 

// Routing.
app.get("/", (req, res) => { 
   res.json({ hello: "World" }); 
});

// Usar las rutas importadas.
app.use('/api/projects', projectRoutes); 
app.use('/api/tasks', taskRoutes); 
app.use('/api/auth', authRoutes); 

// Middleware de manejo de errores (debe estar al final).
app.use(errorHandler); 

// Iniciar nuestro servidor.
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
   console.log(`Servidor escuchando en http://localhost:${PORT}`); 
});
