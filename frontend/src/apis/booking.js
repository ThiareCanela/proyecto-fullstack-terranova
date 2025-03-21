export const searchTourApi = async (pais, fechaInicio, fechaFin) => {
  const url = new URL("http://localhost:8080/tour/buscar/pais-fechas");

  url.searchParams.append("pais", encodeURIComponent(pais));
  url.searchParams.append("fechaInicio", fechaInicio);
  url.searchParams.append("fechaFin", fechaFin);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Tours encontrados:", data);
    return data;
  } catch (error) {
    console.error("Error al buscar tours:", error);
    return null;
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
