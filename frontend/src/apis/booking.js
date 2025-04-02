export const searchTourApi = async (params) => {
  try {
    const filters = {};

    if (params.pais) filters.pais = params.pais;
    if (params.fechaInicio) filters.fechaInicio = params.fechaInicio;
    if (params.fechaFin) filters.fechaFin = params.fechaFin;

    const query_params = new URLSearchParams(filters).toString();
    const response = await fetch(
      `http://localhost:8080/tour/disponibles?${query_params}`
    );

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return { payload: data };
    } catch (e) {
      // Si no se puede hacer JSON.parse, asumimos que no hay tours
      console.warn("Respuesta no válida como JSON. Asumimos sin resultados.");
      return { payload: [] }; // devolvemos array vacío como fallback
    }
  } catch (error) {
    console.error("Error fetching tours:", error);
    return { error: error.message };
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

export const postCreateReservation = async (reservaData) => {
  try {
    const response = await fetch("http://localhost:8080/reservas/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaData),
    });

    const responseData = await response.json();
    console.log("response.status:", response.status);
    console.log("responseData:", responseData);

    if (!response.ok) {
      const errorMsg = responseData?.error || response.statusText;
      throw new Error(errorMsg);
    }

    return responseData;
  } catch (error) {
    console.error("Error al crear la reserva:", error.message);
    throw error;
  }
};


