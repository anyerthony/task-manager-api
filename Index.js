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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}}`));