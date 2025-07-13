// backend/app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000; // Puerto donde correrá tu API

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Middleware para permitir CORS (Comunicación entre Frontend y Backend)
// Esto es CRUCIAL para que tu frontend pueda hablar con tu backend si están en puertos diferentes.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// --- Persistencia en archivo JSON ---
const DATA_FILE = path.join(__dirname, 'tasks.json');
let tasks = [];
let currentId = 1; // Para generar IDs únicos simples

// Cargar tareas desde archivo si existe
function loadTasks() {
    if (fs.existsSync(DATA_FILE)) {
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            tasks = JSON.parse(data);
            // Actualizar currentId para evitar colisiones
            if (tasks.length > 0) {
                currentId = Math.max(...tasks.map(t => parseInt(t.id, 10))) + 1;
            }
        } catch (err) {
            console.error('Error leyendo tasks.json:', err);
            tasks = [];
        }
    }
}

// Guardar tareas en archivo
function saveTasks() {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (err) {
        console.error('Error escribiendo tasks.json:', err);
    }
}

// Cargar tareas al iniciar
loadTasks();

// --- Endpoints de la API ---

// GET /tasks: Obtener todas las tareas
app.get('/tasks', (req, res) => {
    // Copilot: "Generate code to return all tasks"
    res.json(tasks);
});

// POST /tasks: Crear una nueva tarea
app.post('/tasks', (req, res) => {
    // Copilot: "Generate code to create a new task with title, description, dueDate, priority"
    const { title, description, dueDate, priority } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = {
        id: (currentId++).toString(), // Generar un ID simple
        title,
        description: description || '',
        dueDate: dueDate || '',
        priority: priority || 'Low', // Valor por defecto
        status: 'Pending' // Estado inicial
    };
    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask); // 201 Created
});

// PUT /tasks/:id: Actualizar una tarea existente
app.put('/tasks/:id', (req, res) => {
    // Copilot: "Generate code to update a task by id"
    const { id } = req.params;
    const { title, description, dueDate, priority, status } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Actualizar solo los campos que vienen en el body
    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (dueDate !== undefined) tasks[taskIndex].dueDate = dueDate;
    if (priority !== undefined) tasks[taskIndex].priority = priority;
    if (status !== undefined) tasks[taskIndex].status = status;

    saveTasks();
    res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id: Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    // Copilot: "Generate code to delete a task by id"
    const { id } = req.params;
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    if (tasks.length === initialLength) {
        return res.status(404).json({ message: 'Task not found' });
    }
    saveTasks();
    res.status(204).send(); // 204 No Content para eliminación exitosa
});

// Endpoint raíz para comprobar que el backend está funcionando
app.get('/', (req, res) => {
    res.send('API de Lista de Tareas funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});