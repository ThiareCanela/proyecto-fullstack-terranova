import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Search } from "lucide-react";
import { Categories } from "../molecules/Categories";
import { CATEGORIES } from "../../constants";
import TravelCard from "../organisms/TravelCard";
import allPlaces from "../../constants/data";

const places = [
  "Argentina",
  "Chile",
  "Perú",
  "Colombia",
  "Ecuador",
  "México",
  "Brasil",
  "Uruguay",
  "Paraguay",
  "Bolivia",
  "Venezuela",
  "Panamá",
  "Costa Rica",
  "Guatemala",
  "Honduras",
  "El Salvador",
  "Nicaragua",
  "Cuba",
  "República Dominicana",
  "Puerto Rico",
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const locationParam = queryParams.get("location");
  const startDateParam = queryParams.get("startDate");
  const endDateParam = queryParams.get("endDate");

  const [formData, setFormData] = useState({
    location: locationParam || "",
    startDate: startDateParam ? new Date(startDateParam) : null,
    endDate: endDateParam ? new Date(endDateParam) : null,
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const datePickerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors("");

    if (name === "location") {
      const filtered = places.filter((place) =>
        place.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPlaces(filtered);
    }
  };

  const handleSelectPlace = (place) => {
    setFormData({ ...formData, location: place });
    setFilteredPlaces([]);
  };

  const validateForm = () => {
    const { location, startDate, endDate } = formData;
    if (!location || !startDate || !endDate) {
      return "Todos los campos deben estar llenos.";
    }
    if (new Date(startDate) > new Date(endDate)) {
      return "La fecha de inicio no puede ser mayor que la fecha de fin.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setErrors(errorMessage);
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Datos enviados:", formData);

      const queryParams = new URLSearchParams({
        location: formData.location,
        startDate: formData.startDate.toISOString().split("T")[0],
        endDate: formData.endDate.toISOString().split("T")[0],
      }).toString();

      navigate(`/resultados?${queryParams}`);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

  const filteredResults = allPlaces.filter((place) =>
    place.location.toLowerCase().includes(formData.location.toLowerCase())
  );

  return (
    <div className="p-6 mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-2xl shadow-lg flex items-center gap-4 mx-auto max-w-4xl"
      >
        {/* Botón de ubicación */}
        <div className="relative flex-1">
          <button
            type="button"
            className="bg-gray-100 px-4 py-2 rounded-lg text-sm w-full text-left"
            onClick={() => setFilteredPlaces(places)}
          >
            {formData.location || "Dónde"}
          </button>
          {filteredPlaces.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-md">
              {filteredPlaces.map((place) => (
                <li
                  key={place}
                  className="p-2 cursor-pointer hover:bg-gray-200 text-sm"
                  onClick={() => handleSelectPlace(place)}
                >
                  {place}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Campo de fecha */}
        <div className="relative flex-1">
          <button
            type="button"
            className="bg-gray-100 px-4 py-2 rounded-lg text-sm w-full text-left"
            onClick={() => setShowDatePicker(true)}
          >
            {formData.startDate && formData.endDate
              ? `${formData.startDate.toLocaleDateString()} - ${formData.endDate.toLocaleDateString()}`
              : "Cuándo"}
          </button>
          {showDatePicker && (
            <div
              ref={datePickerRef}
              className="absolute z-50 bg-white shadow-lg rounded-lg mt-2"
            >
              <DatePicker
                selected={formData.startDate}
                onChange={(update) => {
                  setFormData({
                    ...formData,
                    startDate: update[0],
                    endDate: update[1],
                  });
                  setShowDatePicker(false);
                }}
                startDate={formData.startDate}
                endDate={formData.endDate}
                selectsRange
                inline
              />
            </div>
          )}
        </div>

        {/* Botón de búsqueda */}
        <button
          type="submit"
          className="bg-[var(--color-secondary)] text-white rounded-lg h-10 w-10 flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-emphasis)]"
          disabled={!!errors || loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
            </div>
          ) : (
            <Search size={18} />
          )}
        </button>
      </form>

      {/* Sección de categorías */}
      <div className="mt-8">
        <Categories categories={CATEGORIES} />
      </div>

      {/* Texto centrado */}
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold">Resultados de tu búsqueda</p>
      </div>

      {/* Resultados de búsqueda */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((place, index) => (
          <TravelCard
            key={`${index}-resulFilter`}
            image={place.image}
            location={place.location}
            name={place.name}
            rating={place.rating}
            price={place.price}
            onDetail={() => console.log(`Detalles de ${place.name}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
