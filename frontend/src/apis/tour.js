import { API_BASE_URL } from "../constants/endpoints";
export const getToursApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour`, {
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
    const response = await fetch(`${API_BASE_URL}/tour/buscar/${id}`);

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

export const postTour = async (tour) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour/agregar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tour),
    });

    if (!response.ok) throw new Error("Error al agregar el tour");

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { error: error.message };
  }
};

export const postTourWithImagesApi = async (tour, imagenes) => {
  const formData = new FormData();
  formData.append("tour", JSON.stringify(tour));

  imagenes.forEach((imagen) => {
    formData.append("imagenes", imagen);
  });

  try {
    const response = await fetch(`${API_BASE_URL}/tour/agregar-con-imagenes`, {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      console.error("Error recibido del backend:", data);
      throw new Error(
        data?.error || data || "Error desconocido al crear el tour"
      ); // 👈 Aquí aseguramos que lanza un error capturable
    }

    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error; // 👈 Lanzamos el error para que `handleSubmit` lo capture
  }
};

export const deleteTourApi = async (tourId) => {
  try {
    console.log(`Enviando solicitud DELETE para el tour ID: ${tourId}`);
    const response = await fetch(`${API_BASE_URL}/tour/${tourId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error desconocido al eliminar el tour"
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Error en deleteTourApi:", error);
    return { success: false, message: error.message };
  }
};

export const updateTourCategoryApi = async (tourId, categoriaId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tour/${tourId}/categoria/${categoriaId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const contentType = response.headers.get("content-type");

    // Manejar si la respuesta no es JSON
    if (!response.ok) {
      const errorMessage =
        contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text(); // Si no es JSON, tratar como texto

      throw new Error(
        errorMessage || "Error al actualizar la categoría del tour."
      );
    }

    // Manejar respuesta en texto plano o JSON
    return contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text(); // Si es texto, devolverlo como está
  } catch (error) {
    console.error("⛔ Error en updateTourCategoryApi:", error);
    throw error;
  }
};
