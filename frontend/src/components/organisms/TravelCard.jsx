import PropTypes from "prop-types";
import { Heart, MapPin, Star } from "lucide-react";

// eslint-disable-next-line react/prop-types
const TravelCard = ({ image, location, name, rating, price, onDetail }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-sm"
      onClick={onDetail}
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
          <Heart className="text-[var(--color-emphasis)]" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-[var(--color-default)]">
            <MapPin size={18} className="text-[var(--color-emphasis)]" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400" />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-default)] mt-2">
          {name}
        </h3>
        <p className="text-[var(--color-emphasis)] font-bold text-lg mt-1">
          ${price}
        </p>
      </div>
    </div>
  );
};

// ✅ Agregamos PropTypes para validar las props
TravelCard.propTypes = {
  image: PropTypes.string.isRequired, // La imagen debe ser un string (URL)
  location: PropTypes.string.isRequired, // La ubicación debe ser un string
  name: PropTypes.string.isRequired, // El nombre del lugar debe ser un string
  rating: PropTypes.number.isRequired, // El rating debe ser un número
  price: PropTypes.number.isRequired, // El precio debe ser un número
};

export default TravelCard;
