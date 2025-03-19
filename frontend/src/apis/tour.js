export const getToursApi = async () => {
  try {
    const response = await fetch("http://localhost:8080/tour", {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener tours: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getToursApi:", error);
    return [];
  }
};

export const getTourByIdApi = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/tour/buscar/${id}`);

    if (!response.ok) {
      throw new Error(`Error al obtener el tour: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getTourById:", error);
    return null;
  }
};

export const postAddTour = async (tourData) => {
  try {
    const response = await fetch("http://localhost:8080/tour/agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tourData),
    });

    if (!response.ok) {
      throw new Error(`Error al agregar el tour: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en addTour:", error);
    throw error;
  }
};
