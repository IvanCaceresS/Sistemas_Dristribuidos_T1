const axios = require('axios');

// Configuramos la URL base de la API
const BASE_URL = 'https://www.freetogame.com/api';

// Definimos el número de solicitudes a realizar
const NUM_REQUESTS = 100;

// Creamos una función para realizar una solicitud a la API
async function makeRequest() {
  const start = Date.now(); // Registramos el tiempo de inicio de la solicitud
  const response = await axios.get(`${BASE_URL}/games`); // Realizamos la solicitud HTTP
  const end = Date.now(); // Registramos el tiempo de finalización de la solicitud
  return { data: response.data, time: end - start }; // Devolvemos los datos y el tiempo de respuesta
}

// Realizamos las solicitudes en bucle
async function run() {
  for (let i = 0; i < NUM_REQUESTS; i++) {
    const { data, time } = await makeRequest();
    console.log(`Solicitud ${i}: ${time}ms`);
    // Si la solicitud tardó más de 500ms, asumimos que hubo una bajada en el rendimiento
    if (time > 3000) {
      console.log('¡Bajada en el rendimiento detectada!');
      break;
    }
  }
}

// Ejecutamos el script
run();