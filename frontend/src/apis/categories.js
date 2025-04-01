import { API_BASE_URL } from "../constants/endpoints";
export const get_categories_api = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categoriaTours`);

    if (!response.ok) {
      throw new Error(`Error al obtener categorías: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
