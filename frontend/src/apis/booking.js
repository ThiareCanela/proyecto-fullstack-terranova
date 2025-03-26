export const searchTourApi = async (params) => {
  try {
    const filters = {};

    if (params.pais) filters.pais = params.pais;
    if (params.fechaInicio) filters.fechaInicio = params.fechaInicio;
    if (params.fechaFin) filters.fechaFin = params.fechaFin;

    const query_params = new URLSearchParams(filters).toString();
    const response = await fetch(
      `http://localhost:8080/tour/buscar/pais-fechas?${query_params}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return { payload: data };
  } catch (error) {
    console.error("Error fetching tours:", error);
    return { error: error.message };
  }
};

export const searchCountryApi = async (pais) => {
  try {
    const response = await fetch(
      `http://localhost:8080/tour/buscar/pais?pais=${encodeURIComponent(pais)}`
    );
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo tours por país:", error);
    return null;
  }
};

export const getTourAvailability = async (idTour) => {
  try {
    const response = await fetch(
      `http://localhost:8080/disponibilidades/${idTour}`
    );
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la disponibilidad:", error);
    return { error: error.message };
  }
};
