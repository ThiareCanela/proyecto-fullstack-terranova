/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { CITIES_TOUR } from "../../constants";
import { useCategory } from "../../hooks/useCategory";
import { useCharacterTour } from "../../hooks/useCharacterTour";
import { ModalConfirm } from "../atoms/ModalConfirm";
import { useTours } from "../../hooks/useTour";

export const TourForm = ({ action, tour = {}, onClose }) => {
const [isOpen, setIsOpen] = useState(false);
const [titulo, setTitulo] = useState(tour?.titulo || "");
const [tipoDuracion, setTipoDuracion] = useState(tour?.tipoDuracion || "");
const [duracion, setDuracion] = useState(tour?.duracion || 0);
const [descripcion, setDescripcion] = useState(tour?.descripcion || "");
const [categoria, setCategoria] = useState(tour?.categoriaTours?.nombre || "");
const [pais, setPais] = useState(tour?.pais || "");
const [precio, setPrecio] = useState(tour?.precio || ""); // Cambio aquí de costo a precio
const [caracteristicas, setCaracteristicas] = useState(tour?.caracteristicas || []);
const [fotos, setFotos] = useState(tour?.imagenes?.map((img) => ({
id: img.id || null,
urlImagen: typeof img === "string" ? img : img.urlImagen,
descripcion: img.descripcion || "",
})) || []);
const [error, setError] = useState(null);
const { categoryData } = useCategory();
const { characTour } = useCharacterTour();
const { updateCategoryTour, getDataTours, createTour, createTourWithImages } = useTours();

const handleCheckboxChange = (e) => {
const { name, checked } = e.target;
setCaracteristicas((prev) =>
checked ? [...prev, name] : prev.filter((item) => item !== name)
);
};

const handleFileUpload = (e) => {
const files = Array.from(e.target.files);

console.log("📂 Archivos seleccionados:", files);
console.log("📂 Cantidad de archivos seleccionados:", files.length);

if (files.length > 3) {
setError("Solo puedes subir hasta 3 imágenes.");
console.log("Error: Más de 3 imágenes seleccionadas.");
return;
}

setError(""); // Limpiar errores previos si la selección es válida
setFotos(files); // Almacena correctamente las imágenes en el estado
console.log("Imágenes almacenadas en el estado:", files);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (error) setError(""); // Limpiar errores previos

  if (
    titulo.trim() === "" ||
    descripcion.trim() === "" ||
    !pais ||
    !precio ||
    !tipoDuracion ||
    !duracion ||
    caracteristicas.length === 0
  ) {
    setError("Todos los campos son obligatorios excepto la categoría.");
    return;
  }

  if (fotos.length < 1) {
    setError("Debes subir al menos una imagen.");
    return;
  }
  if (fotos.length > 3) {
    setError("Solo puedes subir hasta 3 imágenes.");
    return;
  }

  const caracteristicasIds = characTour
    .filter((charac) => caracteristicas.includes(charac.descripcion))
    .map((charac) => charac.id);

  const tourData = {
    titulo,
    descripcion,
    categoriaToursId: categoria !== "" ? categoria : null,
    pais,
    precio,
    caracteristicasIds,
    tipoDuracion,
    duracion,
  };

  try {
    let result = false;

    if (action === "Nuevo") {
      result = await createTourWithImages(tourData, fotos);
    } else if (action === "Editar") {
      result = await updateCategoryTour(tour.id, tour.categoriaTours.id);
    }

    if (result) {
      console.log("Tour creado/actualizado con éxito. Mostrando modal...");
      setIsOpen(true);

      setTimeout(() => {
        setIsOpen(false);
        if (onClose) {
          onClose();
        }
      }, 2000);
    }
  } catch (error) {
    console.error("Error en handleSubmit:", error);

    let errorMessage = "Ocurrió un error inesperado. Intenta nuevamente.";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    console.log("➡ Error seteado en el estado:", errorMessage); // 🔍 Verifica si el estado se actualiza
    setError(errorMessage);
  }
};








// Efecto para verificar las categorías y características al cargar el componente
useEffect(() => {
if (tour) {
setCategoria(tour?.categoriaTours?.id || ""); // Asegúrate de usar el ID correcto
setPais(tour?.pais || "");
setCaracteristicas(
tour?.caracteristicas?.map((c) => c.descripcion) || []
);
}
}, []);


return (
<>
<div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
<h2 className="text-xl font-semibold text-center mb-4">
{action} Tour
</h2>

<form onSubmit={handleSubmit} className="flex flex-col gap-4">
<div className="flex flex-col-reverse md:grid md:grid-cols-2 w-full gap-6 ">
{/* Sección de imágenes */}
<div className="space-y-4 flex items-center justify-center flex-col border-gray-500 border-dashed rounded-3xl border-2 p-8 md:p-2">
{fotos && fotos.length > 0 && fotos.map((foto, index) => (
<div key={`${index}-pho`} className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-md">
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
id="imagenes"
multiple
accept="image/*"
onChange={handleFileUpload}
className="hidden"
/>
<span className="text-gray-600">+ subir foto (máx. 3)</span>
</label>
)}

{error && error.includes("imagen") && (
<p className="text-red-500 text-sm text-center">
{error}
</p>
)}
</div>

{/* Campos del formulario */}
<div className="space-y-4">
<label className="block">
<span className="text-gray-700">Título</span>
<input
type="text"
value={titulo}
disabled={action === "Editar"}
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
disabled={action === "Editar"}
onChange={(e) => setDescripcion(e.target.value)}
className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
action === "Editar" ? "bg-blue-100" : "bg-transparent"
}`}
></textarea>
</label>
<fieldset className={`border border-gray-300 p-3 rounded-md ${action === "Editar" ? "bg-blue-100" : "bg-transparent"}`}>
<legend className="text-gray-700 font-semibold">
Características
</legend>
{characTour.length > 0 ? (
characTour.map((desc, index) => (
<label key={index} className="flex items-center space-x-2">
<input
type="checkbox"
name={desc.descripcion}
checked={caracteristicas.includes(desc.descripcion)}
onChange={() => {
setCaracteristicas((prev) =>
prev.includes(desc.descripcion)
? prev.filter((item) => item !== desc.descripcion)
: [...prev, desc.descripcion]
);
}}
/>
<span>{desc.descripcion}</span>
</label>
))
) : (
<span>No hay características disponibles.</span>
)}
</fieldset>

{/* Categoría */}
<label className="block">
<span className="text-gray-700">Categoría</span>
<select
value={categoria}
onChange={(e) => setCategoria(e.target.value)}
className="mt-1 block w-full border border-gray-300 rounded-md p-2"
>
<option value="" disabled>Selecciona una categoría</option>
{categoryData.length > 0 ? (
categoryData.map((cat) => (
<option key={cat.id} value={cat.id}>
{cat.nombre}
</option>
))
) : (
<option>No hay categorías disponibles</option>
)}
</select>
</label>

{/* Tipo de Duración */}
<label className="block">
<span className="text-gray-700">Tipo de Duración</span>
<select
value={tipoDuracion}
onChange={(e) => setTipoDuracion(e.target.value)}
className="mt-1 block w-full border border-gray-300 rounded-md p-2"
>
<option value="" disabled>Selecciona el tipo de duración</option>
<option value="HORAS">Horas</option>
<option value="DIAS">Días</option>
</select>
</label>

{/* Duración */}
<label className="block">
<span className="text-gray-700">Duración</span>
<input
type="number"
value={duracion}
onChange={(e) => setDuracion(e.target.value)}
className="mt-1 block w-full border border-gray-300 rounded-md p-2"
placeholder="Duración en horas o días"
/>
</label>

{/* Precio */}
<label className="block">
<span className="text-gray-700">Precio</span>
<input
type="number"
value={precio}
onChange={(e) => {
const value = e.target.value;
if (/^\d*\.?\d*$/.test(value)) { // Permite números enteros y decimales
setPrecio(value);
}
}}
className="mt-1 block w-full border border-gray-300 rounded-md p-2"
placeholder="Precio del tour"
min="0"
step="0.01"
/>
</label>

{/* Ubicación/país */}
<label className="block">
<span className="text-gray-700">País</span>
<select
value={pais}
onChange={(e) => setPais(e.target.value)}
className="mt-1 block w-full border border-gray-300 rounded-md p-2"
>
<option value="" disabled>Selecciona un país</option>
{["MÉXICO", "COLOMBIA", "ARGENTINA", "BRASIL", "JAMAICA", "URUGUAY", "COSTA RICA", "CHILE", "PERÚ"]
.sort((a, b) => a.localeCompare(b))
.map((pais) => (
<option key={pais} value={pais}>
{pais}
</option>
))}
</select>
</label>

</div>
</div>

{error && (
<p className="text-red-500 text-sm text-center">
{error}
</p>
)}

<button
type="submit"
className="w-full bg-[var(--color-secondary)] text-white py-2 rounded-md cursor-pointer hover:bg-blue-500"
>
{action === "Nuevo" ? "Agregar Tour" : "Actualizar Tour"}
</button>
</form>
</div>

{isOpen && (
<ModalConfirm
isOpen={isOpen}
message={action === "Nuevo" ? "El tour se agregó exitosamente" : "El tour se actualizó exitosamente"}
onClose={() => {
setIsOpen(false);
setTimeout(() => {
getDataTours();
if (onClose) {
onClose();
}
}, 300);
}}
/>
)}

</>
);

};