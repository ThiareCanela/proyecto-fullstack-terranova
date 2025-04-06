import { useNavigate } from "react-router-dom";
import TravelCard from "./TravelCard";

/* eslint-disable react/prop-types */
export const TravelCardContainer = ({ tours }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center flex-col md:grid md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
      {tours.map((place, index) => (
        <TravelCard
        key={`${index}-card`}
        imagenes={place.imagenes[0]?.urlImagen}
        titulo={place.titulo}
        pais={place.pais}
        precio={place.precio}
        duracion={place.duracion} // ✅ Agrega esta línea
        onDetail={() => navigate(`/detalle/${place.id}`)}
      />      
      ))}
    </div>
  );
};
