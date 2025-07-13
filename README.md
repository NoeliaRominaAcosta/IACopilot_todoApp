# Mi Aplicación de Lista de Tareas con GitHub Copilot

Esta es una aplicación web simple de "Lista de Tareas" desarrollada por Romina Acosta para demostrar la eficiencia de GitHub Copilot en el desarrollo full-stack.El esqueleto inicial de script.js, index.html y styles.css fue generado por Gemini IA y Copilot realizó las modificaciones para conectar frontend y backend además del guardado de las tareas en formato json

## Cómo Iniciar

### Requisitos
- Node.js
- npm
- Visual Studio Code

### Pasos para Ejecutar
1. Clona este repositorio (si aplica) o asegúrate de tener la estructura de carpetas `backend` y `frontend`.
2. **Backend:**
    - Abre una terminal en la carpeta `backend`.
    - Instala las dependencias: `npm install`
    - Inicia el servidor: `node index.js`
    - Deberías ver un mensaje como "Backend server running on http://localhost:3000".
3. **Frontend:**
    - Abre el archivo `frontend/index.html` en tu navegador (preferiblemente usando la extensión Live Server de VS Code para auto-recarga haciendo click derecho sobre el archivo).

## Uso de la Aplicación
- Agrega nuevas tareas con el formulario.
- Se pueden agregar nuevas tareas a través del formulario. Luego, en la tarjeta que se genera, se pueden editar, notificar finalización o eliminar las tareas.

## Uso de GitHub Copilot en el Desarrollo

Aquí se documentará cómo GitHub Copilot asistió en la generación de código.

### Ejemplos Específicos:
- **Generación de Endpoints (Backend):**
    - **Prompt:** `// Copilot: Generate code for a GET /tasks endpoint`
    - **Asistencia:** Me ahorró tiempo al escribir la estructura básica del endpoint y el `res.json(tasks)`.

- **Estructura HTML de Tareas (Frontend):**
    - **Prompt:** `// Copilot: Generate HTML structure for a task item with title, description, dueDate, priority, status and buttons for edit, toggle status, delete`
    - **Asistencia:** Ayudó a crear rápidamente el `div` de la tarea con todos los elementos y clases CSS necesarias, reduciendo la escritura manual.

- **Funciones de Fetch (Frontend):**
    - **Prompt:** `// Copilot: Generate code to fetch tasks from BACKEND_URL`
    - **Asistencia:** Proporcionó la plantilla básica para la petición `fetch`, incluyendo el manejo de `async/await` y la comprobación de `response.ok`.