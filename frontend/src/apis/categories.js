export const get_categories_api = async () => {
  try {
    const response = await fetch("http://localhost:8080/categoriaTours");

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
