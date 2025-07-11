// === PLANTILLA SPA CURSOS ===
// Instrucciones: Implementa aquí la lógica de autenticación.
// Puedes usar localStorage para guardar el usuario logueado.
// Usa la API (api.js) para consultar y registrar usuarios.

import { api } from './api.js'; // Implementa y exporta funciones de API en api.js

export const auth = {
  // Implementa la función de login
  login: async (email, pass) => {
    // TODO: Consulta la API para buscar el usuario por email
    // Si la contraseña coincide, guarda el usuario en localStorage
    // Lanza un error si las credenciales no son válidas
    const users = await api.get(`/users?email=${email}`);
    if (users.length === 0 || users[0].password !== pass) {
      throw new Error('Credenciales inválidas');
    }
    const user = users[0];
    localStorage.setItem('user', JSON.stringify(user)); // Guarda el usuario en localStorage
  },
  // Implementa la función de registro
  register: async (name, email, pass) => {
    // TODO: Consulta la API para verificar si el email ya existe
    // Si no existe, registra el usuario y guárdalo en localStorage
    // Lanza un error si el email ya está registrado
    const existingUser = await api.get(`/users?email=${email}`);
    if (existingUser.length > 0) {
      throw new Error('El email ya está registrado');
    }
    const newUser = { name, email, password: pass };
    await api.post('/users', newUser); // Registra el nuevo usuario
  },
  // Implementa la función de logout
  logout: () => {
    // TODO: Elimina el usuario de localStorage y redirige a login
    localStorage.removeItem('user'); // Elimina el usuario guardado
  },
  // Devuelve true si hay usuario autenticado
  isAuthenticated: () => {
    // TODO: Devuelve true si hay usuario en localStorage
    return !!localStorage.getItem('user'); // Devuelve true si hay un usuario guardado
  },
  // Devuelve el usuario autenticado
  getUser: () => {
    // TODO: Devuelve el usuario guardado en localStorage (o null)
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Devuelve el usuario parseado o null si no existe
   
  }
};
