require('dotenv').config(); // Carga las variables del .env
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Tasks'); // Importamos el modelo

const app = express();
app.use(express.json());

// REEMPLAZA ESTA URL con la que copiaste de Atlas (pon tu password real)
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.error('Error de conexión:', err));

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Guardar tarea en la DB
app.post('/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Actualizar una tarea (marcar como completada o cambiar título)
app.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Esto devuelve la tarea ya actualizada, no la vieja
        );
        if (!updatedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Eliminar una tarea de la base de datos
app.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}}`));