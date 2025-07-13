// frontend/script.js
const BACKEND_URL = 'http://localhost:3000/tasks'; // URL de tu API

const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskPrioritySelect = document.getElementById('taskPriority');
const addTaskButton = document.getElementById('addTaskButton');
const taskListDiv = document.querySelector('.task-list');

// Función para obtener y mostrar todas las tareas
async function fetchTasks() {
    try {
        // Copilot: "Generate code to fetch tasks from BACKEND_URL"
        const response = await fetch(BACKEND_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        taskListDiv.innerHTML = '<p>Error al cargar las tareas.</p>';
    }
}

// Función para renderizar las tareas en el HTML
function renderTasks(tasks) {
    taskListDiv.innerHTML = ''; // Limpiar la lista existente
    if (tasks.length === 0) {
        taskListDiv.innerHTML = '<p>No hay tareas. ¡Agrega una!</p>';
        return;
    }
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.status === 'Completed' ? 'completed' : ''}`;
        taskItem.dataset.id = task.id; // Guarda el ID de la tarea

        // Copilot: "Generate HTML structure for a task item with title, description, dueDate, priority, status and buttons for edit, toggle status, delete"
        taskItem.innerHTML = `
            <div class="task-details">
                <h3>${task.title}</h3>
                <p>${task.description ? `Descripción: ${task.description}` : ''}</p>
                <p>${task.dueDate ? `Vence: ${task.dueDate}` : ''}</p>
                <p>Prioridad: ${task.priority}</p>
                <p>Estado: ${task.status}</p>
            </div>
            <div class="task-actions">
                <button class="edit-button">Editar</button>
                <button class="toggle-status-button">${task.status === 'Completed' ? 'Marcar Pendiente' : 'Marcar Completada'}</button>
                <button class="delete-button">Eliminar</button>
            </div>
        `;
        taskListDiv.appendChild(taskItem);
    });
}

// Función para agregar una nueva tarea
addTaskButton.addEventListener('click', async () => {
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const dueDate = taskDueDateInput.value; // Formato YYYY-MM-DD
    const priority = taskPrioritySelect.value;

    if (!title) {
        alert('El título de la tarea es obligatorio.');
        return;
    }

    const newTask = { title, description, dueDate, priority };

    try {
        // Copilot: "Generate code to post a new task to BACKEND_URL"
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
        }

        // Limpiar los campos del formulario
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
        taskDueDateInput.value = '';
        taskPrioritySelect.value = 'Low';

        fetchTasks(); // Volver a cargar las tareas para ver la nueva
    } catch (error) {
        console.error('Error adding task:', error);
        alert(`Error al agregar la tarea: ${error.message}`);
    }
});

// Delegación de eventos para botones de acción (editar, completar, eliminar)
taskListDiv.addEventListener('click', async (event) => {
    const target = event.target;
    const taskItem = target.closest('.task-item'); // Encuentra el elemento padre de la tarea

    if (!taskItem) return; // Si no es un botón de tarea, no hacer nada

    const taskId = taskItem.dataset.id;

    if (target.classList.contains('delete-button')) {
        // Copilot: "Generate code to delete a task by id using DELETE method"
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            try {
                const response = await fetch(`${BACKEND_URL}/${taskId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                fetchTasks(); // Recargar tareas
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Error al eliminar la tarea.');
            }
        }
    } else if (target.classList.contains('toggle-status-button')) {
        // Copilot: "Generate code to toggle task status (Completed/Pending) using PUT method"
        const currentStatus = taskItem.classList.contains('completed') ? 'Completed' : 'Pending';
        const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';

        try {
            const response = await fetch(`${BACKEND_URL}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchTasks(); // Recargar tareas
        } catch (error) {
            console.error('Error toggling task status:', error);
            alert('Error al cambiar el estado de la tarea.');
        }
    } else if (target.classList.contains('edit-button')) {
         // Copilot: "Generate code to handle edit task functionality, possibly with a prompt or modal"
         // Por ahora, implementaremos una edición simple con prompt
         const currentTitle = taskItem.querySelector('h3').textContent;
         const newTitle = prompt('Editar título de la tarea:', currentTitle);

         if (newTitle !== null && newTitle.trim() !== '') {
             try {
                 const response = await fetch(`${BACKEND_URL}/${taskId}`, {
                     method: 'PUT',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({ title: newTitle.trim() })
                 });
                 if (!response.ok) {
                     throw new Error(`HTTP error! status: ${response.status}`);
                 }
                 fetchTasks(); // Recargar tareas
             } catch (error) {
                 console.error('Error editing task:', error);
                 alert('Error al editar la tarea.');
             }
         }
    }
});


// Cargar las tareas al iniciar la aplicación
fetchTasks();