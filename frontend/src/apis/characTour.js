import { API_BASE_URL } from "../constants/endpoints";
export const charactTourApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/caracteristicas`);

    if (!response.ok) {
      throw new Error(`Error al obtener tours: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getToursApi:", error);
    return [];
  }
};
