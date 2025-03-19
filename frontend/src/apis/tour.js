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

    const data = await response.json();

    if (data.description && typeof data.description === "string") {
      try {
        data.description = JSON.parse(data.description);
      } catch (error) {
        console.error("Error al parsear description:", error);
      }
    }

    return data;
  } catch (error) {
    console.error("Error en getTourById:", error);
    return null;
  }
};

export const postTourWithImagesApi = async (tour, imagenes) => {
  const formData = new FormData();

  formData.append("tour", JSON.stringify(tour));

  imagenes.forEach((imagen) => {
    formData.append("imagenes", imagen);
  });

  try {
    const response = await fetch(
      "http://localhost:8080/tour/agregar-con-imagenes",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Error al agregar el tour con imágenes");
    }

    return response.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const deleteTourApi = async (tourId) => {
  try {
    const response = await fetch(`http://localhost:8080/tour/${tourId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el tour: ${response.statusText}`);
    }

    return { success: true, message: "Tour eliminado correctamente" };
  } catch (error) {
    console.error("Error eliminando el tour:", error);
    return { success: false, message: error.message };
  }
};

export const updateTourCategoryApi = async (tourId, categoriaId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/tour/${tourId}/categoria/${categoriaId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la categoría del tour");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
