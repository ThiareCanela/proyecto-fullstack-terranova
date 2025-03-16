import { useNavigate } from "react-router-dom";
import TravelCard from "./TravelCard";
import allPlaces from "../../constants/data"; // Importamos los datos

const TravelCardContainer = () => {
  const navigate = useNavigate();

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
      {allPlaces.map((place, index) => (
        <TravelCard key={index} {...place} onDetail={() => navigate("/detalle")} />
      ))}
    </div>
  );
};

export default TravelCardContainer;