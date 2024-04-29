const mongoose = require('mongoose');
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error de conexión a MongoDB:', error.message);
  process.exit(1); // Salir de la aplicación si hay un error de conexión
});

// Usar las rutas de tareas
app.use('/tasks', taskRoutes);

// Puerto del servidor obtenido de la variable de entorno PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
