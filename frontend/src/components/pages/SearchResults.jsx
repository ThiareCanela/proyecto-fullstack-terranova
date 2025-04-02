/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Search } from "lucide-react";
import { Categories } from "../molecules/Categories";
import { PAIS } from "../../constants";
import TravelCard from "../organisms/TravelCard";
import { useSearchTour } from "../../hooks/useSearchTour";
import { useCategory } from "../../hooks/useCategory";

const parseDate = (dateString) => {
  if (!dateString) return null;
  const parts = dateString.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { dataResult, searchTours, loading, setLoading } = useSearchTour();
  const { categoryData } = useCategory();

  const paisParam = queryParams.get("pais");
  const fechaInicioParam = queryParams.get("fechaInicio");
  const fechaFinParam = queryParams.get("fechaFin");

  const [formData, setFormData] = useState({
    pais: paisParam || "",
    fechaInicio: parseDate(fechaInicioParam),
    fechaFin: parseDate(fechaFinParam),
  });

  const [errors, setErrors] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const datePickerRef = useRef(null);

  const handleSelectPlace = (place) => {
    setFormData({ ...formData, pais: place });
    setFilteredPlaces([]);
  };

  const validateForm = () => {
    const { pais, fechaInicio, fechaFin } = formData;
    if (!pais || !fechaInicio || !fechaFin) {
      return "Todos los campos deben estar llenos.";
    }
    if (new Date(fechaInicio) > new Date(fechaFin)) {
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
    setErrors("");
    setLoading(true);
    setFilteredPlaces([]);
    setShowDatePicker(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Datos enviados:", formData);

      const queryParams = new URLSearchParams({
        pais: formData.pais,
        fechaInicio: formData.fechaInicio.toISOString().split("T")[0],
        fechaFin: formData.fechaFin.toISOString().split("T")[0],
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pais = queryParams.get("pais");
    const fechaInicio = queryParams.get("fechaInicio");
    const fechaFin = queryParams.get("fechaFin");
  
    if (pais && fechaInicio && fechaFin) {
      searchTours({ pais, fechaInicio, fechaFin });
    }
  }, [location.search]);
  

  return (
    <div className="p-6 mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-2xl shadow-lg flex items-center gap-4 mx-auto max-w-4xl"
      >
        <div className="relative flex-1">
          <button
            type="button"
            className="bg-gray-100 px-4 py-2 rounded-lg text-sm w-full text-left"
            onClick={() => setFilteredPlaces(PAIS)}
          >
            {formData.pais || "Dónde"}
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

        <div className="relative flex-1">
          <button
            type="button"
            className="bg-gray-100 px-4 py-2 rounded-lg text-sm w-full text-left"
            onClick={() => setShowDatePicker(true)}
          >
            {formData.fechaInicio && formData.fechaFin
              ? `${formData.fechaInicio.toLocaleDateString(
                  "es-ES"
                )} - ${formData.fechaFin.toLocaleDateString("es-ES")}`
              : "Cuándo"}
          </button>
          {showDatePicker && (
            <div
              ref={datePickerRef}
              className="absolute z-50 bg-white shadow-lg rounded-lg mt-2"
            >
              <DatePicker
                selected={formData.fechaInicio}
                onChange={(update) => {
                  setFormData({
                    ...formData,
                    fechaInicio: update[0],
                    fechaFin: update[1],
                  });

                  if (update[0] && update[1]) {
                    setShowDatePicker(false);
                  }
                }}
                startDate={formData.fechaInicio}
                endDate={formData.fechaFin}
                selectsRange
                inline
                minDate={new Date()}
              />
            </div>
          )}
        </div>

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

      <div className="mt-8">
        <Categories categories={categoryData} />
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg font-semibold">Resultados de tu búsqueda</p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataResult.map((place, i) => (
          <TravelCard
            key={`${i}-resulFilterTour`}
            imagenes={place.imagenes[0].urlImagen}
            pais={place.pais}
            titulo={place.titulo}
            // rating={place.rating}
            precio={place.precio}
            onDetail={() => navigate(`/detalle/${place.id}`)}
          />
        ))}
      </div>
      {dataResult.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No se encontraron tours para la fecha seleccionada. Intenta con otra
          fecha o destino.
        </p>
      )}
    </div>
  );
};

export default SearchResults;
