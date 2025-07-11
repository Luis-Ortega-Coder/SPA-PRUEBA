// === PLANTILLA SPA CURSOS ===
// Instrucciones: Implementa aquí las funciones para comunicarte con la API REST.
// Puedes usar fetch para hacer peticiones HTTP (GET, POST, PUT, DELETE).
// Cambia la URL base si tu API está en otro puerto o ruta.

export const api = {
  base: 'http://localhost:3000', // Cambia la URL si es necesario
  // Implementa la función GET
  get: async param => {
    // TODO: Realiza una petición GET a la API y devuelve los datos
    try {
      const response = await fetch(`${this.base}${param}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en la petición GET:', error);
      throw error;
    }
  },
  // Implementa la función POST
  post: async (param, data) => {
    // TODO: Realiza una petición POST a la API con los datos
    try {
      const response = await fetch(`${this.base}${param}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Error al crear los datos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en la petición POST:', error);
      throw error;
    }
  },
  // Implementa la función PUT
  put: async (p, data) => {
    // TODO: Realiza una petición PUT a la API con los datos
  },
  // Implementa la función DELETE
  del: async p => {
    // TODO: Realiza una petición DELETE a la API
  }
};
