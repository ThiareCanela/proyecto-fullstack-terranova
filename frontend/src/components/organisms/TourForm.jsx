/* eslint-disable react/prop-types */

import { useState } from "react";
import { CITIES_TOUR } from "../../constants";
import { useCategory } from "../../hooks/useCategory";
import { useCharacterTour } from "../../hooks/useCharacterTour";
import { ModalConfirm } from "../atoms/ModalConfirm";
import { useTours } from "../../hooks/useTour";

export const TourForm = ({ action, tour = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [titulo, setTitulo] = useState(tour?.titulo || "");
  const [tipoDuracion, setTipoDuracion] = useState(tour?.tipoDuracion || "");
  const [duracion, setDuracion] = useState(tour?.duracion || 0);
  const [descripcion, setDescripcion] = useState(tour?.descripcion || "");
  const [categoria, setCategoria] = useState(
    tour?.categoriaTours?.nombre || ""
  );
  const [ubicacion, setUbicacion] = useState(tour?.pais || "");
  const [costo, setCosto] = useState(tour?.precio || "");
  const [caracteristicas, setCaracteristicas] = useState(
    tour?.caracteristicas || []
  );
  const [fotos, setFotos] = useState(tour?.imagenes || []);
  const [error, setError] = useState(null);
  const { categoryData } = useCategory();
  const { characTour } = useCharacterTour();
  const { createTour } = useTours();

  // const handleCheckboxChange = (e) => {
  //   setCaracteristicas({
  //     ...caracteristicas,
  //     [e.target.name]: e.target.checked,
  //   });
  // };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCaracteristicas((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    if (fotos.length + files.length > 3) {
      alert("Solo puedes subir hasta 3 imágenes.");
      return;
    }

    setFotos((prevFotos) => [...prevFotos, ...files].slice(0, 3));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (titulo.trim() === "") {
      setError("El título es obligatorio.");
      return;
    }
    const tourData = {
      titulo,
      descripcion,
      categoria,
      ubicacion,
      costo,
      caracteristicas,
      fotos,
    };
    console.log({
      titulo,
      descripcion,
      categoria,
      ubicacion,
      costo,
      caracteristicas,
      fotos,
    });

    if (action === "Nuevo") {
      const result = createTour(tourData);
      if (result) {
        setIsOpen(true);
      } else {
        setError("Error al crear el tour. Intenta nuevamente.");
      }
    } else {
      setIsOpen(true); // Para edición, solo mostramos el modal de éxito
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          {action} Tour
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 w-full gap-6 ">
            <div className="space-y-4 flex items-center justify-center flex-col border-gray-500 border-dashed rounded-3xl border-2 p-8 md:p-2">
              {fotos.map((foto, index) => (
                <div
                  key={`${index}-pho`}
                  className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-md"
                >
                  <img
                    src={URL.createObjectURL(foto)}
                    alt={`Tour ${index}`}
                    className="h-full w-auto"
                  />
                </div>
              ))}

              {fotos.length < 3 && (
                <label className="border-dashed border-2 border-gray-400 rounded-md p-4 text-center cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="text-gray-600">+ subir foto</span>
                </label>
              )}
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Título</span>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Descripción</span>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </label>
              <fieldset className="border border-gray-300 p-3 rounded-md">
                <legend className="text-gray-700 font-semibold">
                  Características
                </legend>

                {characTour.map((op) => (
                  <label
                    key={`${op.id}-op`}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      name={op.descripcion}
                      checked={caracteristicas[op.descripcion]}
                      onChange={handleCheckboxChange}
                    />
                    <span>{op.descripcion}</span>
                  </label>
                ))}
              </fieldset>

              <label className="block">
                <span className="text-gray-700">Categoría</span>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {(categoryData || []).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700">Ubicación</span>
                  <select
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="" disabled>
                      Selecciona una ubicación
                    </option>
                    {CITIES_TOUR.map((ubi) => (
                      <option key={ubi.value} value={ubi.value}>
                        {ubi.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-gray-700">Costo</span>
                  <input
                    type="text"
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </label>
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700">Tipo Duración</span>
                  <input
                    type="text"
                    value={tipoDuracion}
                    onChange={(e) => setTipoDuracion(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Duración</span>
                  <input
                    type="text"
                    value={duracion}
                    onChange={(e) => setDuracion(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </label>
              </div>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center w-full grid-cols-1 md:grid-cols-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full grid-cols-1 md:grid-cols-2 bg-[var(--color-secondary)] text-white py-2 rounded-md"
          >
            {action === "Nuevo" ? "Agregar Tour" : "Actualizar Tour"}
          </button>
        </form>
      </div>
      {isOpen && (
        <ModalConfirm
          isOpen={isOpen}
          message={
            action === "Nuevo"
              ? "El tour se agregó exitosamente"
              : "El tour se actualizó exitosamente"
          }
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
