// === PLANTILLA SPA CURSOS ===
// Instrucciones: Implementa la lógica de enrutamiento y vistas importando las funciones necesarias desde views.js y auth.js.
// Puedes agregar, modificar o eliminar rutas según lo requiera tu aplicación.

// Importa los módulos necesarios
import { auth } from './auth.js';
import {
  showLogin, // Implementa en views.js
  showRegister, // Implementa en views.js
  showDashboard, // Implementa en views.js
  showCourses, // Implementa en views.js
  showCreateCourse, // Implementa en views.js
  showEditCourse, // Implementa en views.js
  renderNotFound // Implementa en views.js
} from './views.js';

// Define aquí las rutas de tu SPA
const routes = {
  '#/login': showLogin, // Vista de login
  '#/register': showRegister, // Vista de registro
  '#/dashboard': showDashboard, // Vista principal tras login
  '#/dashboard/courses': showCourses, // Listado de cursos
  '#/dashboard/courses/create': showCreateCourse, // Formulario para crear curso
  // Puedes agregar más rutas según lo necesites
};

// Función principal de enrutamiento
export function router() {
  const path = location.hash || '#/login';
  const user = auth.getUser();

  // Ejemplo: proteger rutas de dashboard
  if (path.startsWith('#/dashboard') && !auth.isAuthenticated()) {
    location.hash = '#/login';
    return;
  }

  // Ejemplo: evitar que usuarios logueados accedan a login/register
  if ((path === '#/login' || path === '#/register') && auth.isAuthenticated()) {
    location.hash = '#/dashboard';
    return;
  }

  // Ejemplo: ruta dinámica para editar curso
  if (path.startsWith('#/dashboard/courses/edit/')) {
    showEditCourse(); // Implementa esta función en views.js
    return;
  }

  // Cargar la vista correspondiente
  const view = routes[path];
  if (view) {
    view();
  } else {
    renderNotFound(); // Implementa esta función en views.js
  }
}

// Recuerda agregar los listeners en app.js para inicializar el router
// window.addEventListener('hashchange', router);
// window.addEventListener('DOMContentLoaded', router);
