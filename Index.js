const express = require('express'); // Importamos la librería
const app = express(); // Inicializamos express
const PORT = 3000; // El puerto donde vivirá el servidor

// Nuestra primera "Ruta"
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando! voy recordando mas o menos.');
});

app.use(express.json()); // Esto permite que tu servidor lea el cuerpo (body) de las peticiones POST

let tasks = [
    { id: 1, title: 'Aprender Node.js', completed: false },
    { id: 2, title: 'Configurar Nodemon', completed: true }
];

// 1. Obtener todas las tareas (READ)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// 2. Crear una nueva tarea (CREATE)
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 3. Eliminar una tarea (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.status(204).send();
});



// Encendemos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});