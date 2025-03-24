import { useNavigate } from "react-router-dom";
import TravelCard from "./TravelCard";
import { useTours } from "../../hooks/useTour";
import { useEffect, useState } from "react";

export const TravelCardContainer = () => {
  const navigate = useNavigate();
  const { tours } = useTours();
  const [places, setPlaces] = useState([]);

  const getRandomTours = (array, num) => {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  };

  useEffect(() => {
    if (tours.length > 0) {
      setPlaces(getRandomTours(tours, 9));
    }
  }, [tours]);

  return (
    <div className="flex items-center flex-col md:grid md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
      {places.map((place, index) => (
        <TravelCard
          key={`${index}-card`}
          imagenes={place.imagenes[0].urlImagen}
          titulo={place.titulo}
          pais={place.pais}
          precio={place.precio}
          onDetail={() => navigate(`/detalle/${place.id}`)}
        />
      ))}
    </div>
  );
};
