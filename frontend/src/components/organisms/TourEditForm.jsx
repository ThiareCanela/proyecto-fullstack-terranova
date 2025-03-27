import { useEffect, useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import { useTours } from "../../hooks/useTour";

/* eslint-disable react/prop-types */
export const TourEditForm = ({ tour, onClose }) => {
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (tour) {
      setCategoria(tour?.categoriaTours?.id || "");
    }
  }, [tour]);

  const { categoryData } = useCategory();
  const { updateCategoryTour, getDataTours } = useTours();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoria) {
      alert("Debe seleccionar una categoría antes de actualizar.");
      return;
    }

    try {
      const result = await updateCategoryTour(tour.id, categoria);
      if (result) {
        getDataTours();
        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  if (!tour) {
    return <p className="text-center text-gray-500">Cargando datos del tour...</p>;
  }

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        Editar Categoría del Tour
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Título</span>
            <input type="text" value={tour.titulo} disabled className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100" />
          </label>

          <label className="block">
            <span className="text-gray-700">Descripción</span>
            <textarea value={tour.descripcion} disabled className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"></textarea>
          </label>

          <label className="block">
            <span className="text-gray-700">Tipo de Duración</span>
            <input type="text" value={tour.tipoDuracion} disabled className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100" />
          </label>

          <label className="block">
            <span className="text-gray-700">Duración</span>
            <input type="number" value={tour.duracion} disabled className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100" />
          </label>

          <label className="block">
            <span className="text-gray-700">País</span>
            <input type="text" value={tour.pais} disabled className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100" />
          </label>

          <label className="block">
            <span className="text-gray-700">Precio</span>
            <input type="number" value={tour.precio} disabled className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100" />
          </label>

          {/* Imágenes */}
          <div className="space-y-4">
            <span className="text-gray-700">Imágenes</span>
            <div className="flex space-x-4">
              {tour.imagenes?.map((img, index) => (
                <img key={index} src={img.urlImagen} alt={img.descripcion || `Imagen ${index + 1}`} className="h-24 w-24 object-cover border rounded-md" />
              ))}
            </div>
          </div>

          {/* Categoría (único campo editable) */}
          <label className="block">
            <span className="text-gray-700">Categoría</span>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="" disabled>Selecciona una categoría</option>
              {categoryData.length > 0 ? (
                categoryData.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))
              ) : (
                <option>No hay categorías disponibles</option>
              )}
            </select>
          </label>
        </div>

        <div className="flex justify-between">
          <button type="button" className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-gray-500" onClick={onClose}>
            Cerrar
          </button>
          
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">
            Actualizar Categoría
          </button>
        </div>
      </form>
    </div>
  );
};
