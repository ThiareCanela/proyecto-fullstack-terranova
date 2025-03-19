export const charactTourApi = async () => {
  try {
    const response = await fetch("http://localhost:8080/caracteristicas");

    if (!response.ok) {
      throw new Error(`Error al obtener tours: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getToursApi:", error);
    return [];
  }
};
