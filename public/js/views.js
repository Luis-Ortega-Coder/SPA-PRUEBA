import { api } from './api.js'; 
import { auth } from './auth.js';
import { router } from './router.js';


export function renderNotFound() {
  document.getElementById('app').innerHTML = '<h2>No found</h2>';
}


export async function showLogin() {
  document.getElementById('app').innerHTML = `
    <div class="login-container">
      <form id="form" class="login-form card">
        <h2 style="text-align:center; margin-bottom:1em;">Log in</h2>
        <input type="email" id="email" placeholder="email">
        <input type="password" id="password" placeholder="password">
        <button>login</button>
        <br>
        <a href="#/register" data-link> register </a>
      </form>
    </div>`;
  document.getElementById('form').onsubmit = async e => {
    e.preventDefault();
    try {
      await auth.login(e.target.email.value, e.target.password.value);
      location.hash = '#/dashboard';
      router();
    } catch (err) {
      alert(err.message);
    }
  };
}


export async function showRegister() {
  document.getElementById('app').innerHTML = `
    <div class="login-container">
      <form id="form" class="login-form card">
        <h2 style="text-align:center; margin-bottom:1em;">Registro</h2>
        <input placeholder="name" id="username">
        <input placeholder="email" id="email">
        <input placeholder="pass" id="password">
        <button>Create an acount</button>
        
      </form>
    </div>`;
  document.getElementById('form').onsubmit = async e => {
    e.preventDefault();
    try {
      await auth.register(e.target.username.value, e.target.email.value, e.target.password.value);
      location.hash = '#/dashboard';
      router();
    } catch (err) {
      alert(err.message);
    }
  };
}


export async function showDashboard() {
  const dataUser = auth.getUser();
  document.getElementById('app').innerHTML = `
    <h2>Bienvenido, ${dataUser.name} (${dataUser.role})</h2>
    <button id="out">Logout</button>
    <nav>
      <a href="#/dashboard/courses" data-link>Ver cursos</a>
      ${dataUser.role === 'admin' ? `<a href="#/dashboard/courses/create" data-link>Create Event</a>` : ''}
    </nav>`;
  document.getElementById('out').onclick = auth.logout;
  document.querySelectorAll('[data-link]').forEach(a => {
    a.onclick = e => {
      e.preventDefault();
      location.hash = a.getAttribute('href');
    };
  });
}


export async function showCourses() {
  const user = auth.getUser();
  const courses = await api.get('/events');

  document.getElementById('app').innerHTML = `
    <h2> available winds </h2>
    <ul>${courses.map(c => `
      <li>${c.title || 'Sin título'} (${c.capacity || 0} slots) — Instructor: ${c.instructor || 'N/A'}
        ${user.role === 'admin' ? `<button onclick="editCourse(${c.id})">Editar</button>` : ''}
        ${user.role === 'visitante' ? `<button class="enroll-btn" data-id="${c.id}">Inscribirse</button>` : ''}
      </li>`).join('')}</ul>`;

  if (user.role === 'visitante') {
    document.querySelectorAll('.enroll-btn').forEach(btn => {
      btn.onclick = async () => {
        const courseId = btn.dataset.id;

        
        const course = await api.get('/events' + courseId);

       
        if (!course.enrolled) course.enrolled = [];

       
        if (course.enrolled.includes(u.email)) {
          alert('Ya estás inscrito en este curso.');
          return;
        }

        let capacity=course.capacity-1;

       
        if (course.enrolled.length >= course.capacity) {
          alert('Este curso ya está lleno.');
          return;
        }

        course.enrolled.push(u.email);
        course.capacity = capacity;

        await api.put('/events' + courseId, course);
        alert('Inscripción exitosa!');
        showCourses(); 
      };
    });
  }
}


export function showCreateCourse() {
  document.getElementById('app').innerHTML = `
    <h2>Crear Evento</h2>
    <form id="f">
      <input placeholder="Título" id="title">
      <input placeholder="Instructor" id="instructor">
      <input type="number" placeholder="Capacidad" id="capacity">
      <button Type ="submit" >Guardar</button>
    </form>`;
  document.getElementById('f').onsubmit = async e => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      instructor: e.target.instructor.value,
      capacity: parseInt(e.target.capacity.value)
    };
    try {
      await api.post('/events', data);
      
    } catch (error) {
      alert(error)
    }

    location.hash = '#/dashboard';
    router();
  };
}


export async function showEditCourse() {
  const user = auth.getUser();
  if (user.role !== 'admin') {
    renderNotFound();
    return;
  }

  const courseId = location.hash.split('/').pop();
  const course = await api.get('/events/', courseId);

  if (!course) {
    renderNotFound();
    return;
  }

  document.getElementById('app').innerHTML = `
    <h2>Editar Curso</h2>
    <form id="form">
      <input id="title" placeholder="Título" value="${course.title}">
      <input id="instructor" placeholder="Instructor" value="${course.instructor}">
      <input type="number" id="capacity" placeholder="Capacidad" value="${course.capacity}">
      <button>Guardar</button>
    </form>`;

  document.getElementById('form').onsubmit = async e => {
    e.preventDefault();
    const updated = {
      title: e.target.title.value,
      instructor: e.target.instructor.value,
      capacity: parseInt(e.target.capacity.value)
    };
    await api.put('/events/' + courseId, updated);
    location.hash = '#/dashboard/courses';
    router();
  };
}


