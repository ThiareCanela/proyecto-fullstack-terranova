import { useEffect, useState } from "react";
import {
  deleteTourApi,
  getTourByIdApi,
  getToursApi,
  postTour,
  postTourWithImagesApi,
  updateTourCategoryApi,
} from "../apis/tour";
/* eslint-disable react-hooks/exhaustive-deps */
export const useTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTour, setNewTour] = useState(null);

  const getDataTours = async () => {
    setLoading(true);
    try {
      const data = await getToursApi();
      console.log("Datos actualizados de la API:", data);

      if (data) {
        setTours([]); // Resetear antes de actualizar
        setTimeout(() => {
          setTours([...data]); // Forzar re-render con nuevo array
        }, 100);
      }
    } catch (err) {
      setError(err?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const createTour = async (tourData) => {
    setLoading(true);
    setError(null);

    try {
      const createdTour = await postTour(tourData);
      setNewTour(createdTour);
      return createdTour;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createTourWithImages = async (tourData, images) => {
    setLoading(true);
    setError(null);
  
    try {
      console.log("📤 Enviando datos a postTourWithImagesApi:", tourData, images);
      const createdTour = await postTourWithImagesApi(tourData, images);
      console.log("✅ Respuesta exitosa del backend:", createdTour);
  
      setNewTour(createdTour);
      return createdTour;
    } catch (err) {
      console.error("⛔ Error capturado en createTourWithImages:", err);
  
      const errorMessage =
        err?.error || err?.message || "Ocurrió un error inesperado.";
  
      setError(errorMessage); // Seteamos el error en el estado
      throw new Error(errorMessage); // Lanzamos el error para que lo capture `handleSubmit`
    } finally {
      setLoading(false);
    }
  };
  

  const deleteTour = async (tourId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await deleteTourApi(tourId);

      if (result.success) {
        console.log("Tour eliminado correctamente");
        await getDataTours(); // Esperar a que los datos se actualicen después de eliminar
      } else {
        console.error("Error al eliminar el tour:", result.message);
      }

      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryTour = async (tourId, categoriaId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await updateTourCategoryApi(tourId, categoriaId);

      if (result) {
        console.log("Tour actualizado correctamente");
        await getDataTours(); // Esperar a que los datos se actualicen después de editar
      } else {
        console.error("Error al actualizar el tour");
      }

      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tours.length === 0) {
      getDataTours();
    }
  }, []);

  return {
    tours,
    newTour,
    loading,
    error,
    createTour,
    createTourWithImages,
    deleteTour,
    getDataTours,
    updateCategoryTour,
  };
};

export const useTourById = (id) => {
  const [oneTour, setOneTour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      setLoading(true);
      try {
        const data = await getTourByIdApi(id);
        setOneTour(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  return { oneTour, loading, error, selectedId, setSelectedId };
};
