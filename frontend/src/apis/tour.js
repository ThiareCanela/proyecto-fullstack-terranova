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

// export const getTourByIdApi = async (id) => {
//   try {
//     const response = await fetch(`http://localhost:8080/tour/buscar/${id}`);

//     if (!response.ok) {
//       throw new Error(`Error al obtener el tour: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error en getTourById:", error);
//     return null;
//   }
// };

export const getTourByIdApi = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/tour/buscar/${id}`);

    if (!response.ok) {
      throw new Error(`Error al obtener el tour: ${response.statusText}`);
    }

    const data = await response.json();

    // Verifica si "description" es un string JSON y lo parsea
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

// export const postAddTour = async (tourData) => {
//   try {
//     const response = await fetch("http://localhost:8080/tour/agregar", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(tourData),
//     });

//     if (!response.ok) {
//       throw new Error(`Error al agregar el tour: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error en addTour:", error);
//     throw error;
//   }
// };

// export const postTourWithImagesApi = async (tourData, images) => {
//   try {
//     const formData = new FormData();

//     // Agregar el objeto JSON convertido a string
//     formData.append(
//       "tour",
//       new Blob([JSON.stringify(tourData)], { type: "application/json" })
//     );

//     // Agregar imágenes
//     images.forEach((image) => {
//       formData.append(`imagenes`, image);
//     });

//     console.log("FormData enviado:");
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     const response = await fetch(
//       "http://localhost:8080/tour/agregar-con-imagenes",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error al agregar el tour: ${errorText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error en addTourWithImagesApi:", error);
//     return null;
//   }
// };

export const postTourWithImagesApi = async (tour, imagenes) => {
  const formData = new FormData();

  // Agregar el objeto tour como JSON
  formData.append("tour", JSON.stringify(tour));

  // Agregar múltiples imágenes con el mismo nombre de campo
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
