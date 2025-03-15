// import { UploadImgTours } from "../molecules/UploadImgTours";
/* eslint-disable react/prop-types */
// export const TourForm = ({ action }) => {
//   return (
//     <div>
//       <h4>{action}</h4>
//       <form className="flex flex-col w-full md:flex-row-reverse md:gap-6">
//         <div></div>
//         <UploadImgTours />
//       </form>
//     </div>
//   );
// };

import { useState } from "react";

export const TourForm = ({ action }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [costo, setCosto] = useState("");
  const [caracteristicas, setCaracteristicas] = useState({
    guia: false,
    miradores: false,
    acampado: false,
  });
  const [fotos, setFotos] = useState([]);
  const [error, setError] = useState(null);

  const handleCheckboxChange = (e) => {
    setCaracteristicas({
      ...caracteristicas,
      [e.target.name]: e.target.checked,
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setFotos([...fotos, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titulo === "") {
      setError("Ya existe un tour con este nombre. Intenta con uno diferente.");
      return;
    }
    console.log({
      titulo,
      descripcion,
      categoria,
      ubicacion,
      costo,
      caracteristicas,
      fotos,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">{action} Tour</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4 flex items-center justify-center flex-col border-gray-300 border-solid border p-2">
          {fotos.map((foto, index) => (
            <div
              key={index}
              className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-md"
            >
              <img
                src={URL.createObjectURL(foto)}
                alt={`Tour ${index}`}
                className="h-full w-auto"
              />
            </div>
          ))}
          <label className="border-dashed border-2 border-gray-400 rounded-md p-4 text-center cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="text-gray-600">+ subir foto</span>
          </label>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="guia"
                checked={caracteristicas.guia}
                onChange={handleCheckboxChange}
              />
              <span>Guía incluido</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="miradores"
                checked={caracteristicas.miradores}
                onChange={handleCheckboxChange}
              />
              <span>Miradores cercanos</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="acampado"
                checked={caracteristicas.acampado}
                onChange={handleCheckboxChange}
              />
              <span>Zona de acampado</span>
            </label>
          </fieldset>
          <label className="block">
            <span className="text-gray-700">Categoría</span>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700">Ubicación</span>
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Agregar Tour
          </button>
        </form>
      </div>
    </div>
  );
};
