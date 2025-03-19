/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
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
  const [fotos, setFotos] = useState(
    tour?.imagenes?.map((img) => ({
      id: img.id || null,
      urlImagen: typeof img === "string" ? img : img.urlImagen,
      descripcion: img.descripcion || "",
    })) || []
  );
  const [error, setError] = useState(null);
  const { categoryData } = useCategory();
  const { characTour } = useCharacterTour();
  const { createTourWithImages, updateCategoryTour, getDataTours } = useTours();

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCaracteristicas((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (fotos.length + files.length > 3) {
      setError("Solo puedes subir hasta 3 imágenes.");
      return;
    }

    const newImages = files.map((file) => ({
      id: null,
      urlImagen: URL.createObjectURL(file),
      descripcion: "",
      file,
    }));

    setFotos((prevFotos) => [...prevFotos, ...newImages].slice(0, 3));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) setError("");

    if (
      titulo.trim() === "" ||
      descripcion.trim() === "" ||
      !ubicacion ||
      !categoria ||
      !duracion
    ) {
      setError(
        "Los campos título, descripción, características, ubicación, categoría, costo, duración, tipoDuración e imágenes son requeridos."
      );
      return;
    }

    const tourData = {
      titulo,
      descripcion,
      categoria,
      ubicacion,
      costo,
      caracteristicas,
      tipoDuracion,
      duracion,
      imagenes: fotos.map(({ id, urlImagen, descripcion }) => ({
        id,
        urlImagen,
        descripcion,
      })),
    };

    const imageFiles = fotos
      .filter((foto) => foto.file)
      .map((foto) => foto.file);

    try {
      if (action === "Nuevo") {
        const result = await createTourWithImages(tourData, imageFiles);
        console.log("Resultado del API:", result);

        if (result) {
          setIsOpen(true);
        } else {
          setError("Error al crear el tour. Intenta nuevamente.");
        }
      } else if (action === "Editar") {
        const result = await updateCategoryTour(
          tour.id,
          tour.categoriaTours.id
        );
        if (result) {
          setIsOpen(true);
          getDataTours();
        } else {
          setError("Error al actualizar el tour. Intenta nuevamente.");
        }
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      setError(`Ocurrió un error inesperado: ${error.message || error}`);
    }
  };

  useEffect(() => {
    if (tour) {
      setCategoria(tour?.categoriaTours?.id || ""); // Asegúrate de usar el ID correcto
      setUbicacion(tour?.pais || "");
      setCaracteristicas(tour.caracteristicas.map((c) => c.descripcion) || []);
    }
  }, [tour]);

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
                    src={foto.urlImagen}
                    alt={foto.descripcion || `Imagen ${index + 1}`}
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
                  disabled={action === "Editar" ? true : false}
                  onChange={(e) => setTitulo(e.target.value)}
                  className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                    action === "Editar" ? "bg-blue-100" : "bg-transparent"
                  }`}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Descripción</span>
                <textarea
                  value={descripcion}
                  disabled={action === "Editar" ? true : false}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                    action === "Editar" ? "bg-blue-100" : "bg-transparent"
                  }`}
                ></textarea>
              </label>
              <fieldset
                className={`border border-gray-300 p-3 rounded-md  ${
                  action === "Editar" ? "bg-blue-100" : "bg-transparent"
                }`}
              >
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
                      disabled={action === "Editar" ? true : false}
                      name={op.descripcion}
                      // checked={caracteristicas[op.descripcion]}
                      checked={caracteristicas.includes(op.descripcion)}
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
                    disabled={action === "Editar" ? true : false}
                    onChange={(e) => setUbicacion(e.target.value)}
                    className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                      action === "Editar" ? "bg-blue-100" : "bg-transparent"
                    }`}
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
                    disabled={action === "Editar" ? true : false}
                    onChange={(e) => setCosto(e.target.value)}
                    className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                      action === "Editar" ? "bg-blue-100" : "bg-transparent"
                    }`}
                  />
                </label>
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700">Tipo Duración</span>
                  <input
                    type="text"
                    value={tipoDuracion}
                    disabled={action === "Editar" ? true : false}
                    onChange={(e) => setTipoDuracion(e.target.value)}
                    className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                      action === "Editar" ? "bg-blue-100" : "bg-transparent"
                    }`}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Duración</span>
                  <input
                    type="number"
                    value={duracion}
                    disabled={action === "Editar" ? true : false}
                    onChange={(e) => setDuracion(e.target.value)}
                    className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                      action === "Editar" ? "bg-blue-100" : "bg-transparent"
                    }`}
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
            className="w-full grid-cols-1 md:grid-cols-2 bg-[var(--color-secondary)] text-white py-2 rounded-md cursor-pointer hover:bg-blue-500"
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
