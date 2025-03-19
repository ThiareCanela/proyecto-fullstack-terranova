import { useNavigate } from "react-router-dom";
import TravelCard from "./TravelCard";
import { useTours } from "../../hooks/useTour";

export const TravelCardContainer = () => {
  const navigate = useNavigate();
  const { tours } = useTours();
  return (
    <div className=" flex items-center flex-col md:grid  md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
      {tours.map((place, index) => (
        <TravelCard
          key={`${index}-card`}
          {...place}
          onDetail={() => navigate(`/detalle/${place.id}`)}
        />
      ))}
    </div>
  );
};
