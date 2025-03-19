/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchTour } from "../../hooks/useSearchTour";
import { PAIS } from "../../constants";

export const BookingForm = () => {
  const navigate = useNavigate();
  const { resultTours, loading, searchTour, setLoading } = useSearchTour();
  const [formData, setFormData] = useState({
    location: "",
    startDate: null,
    endDate: null,
  });
  const [errors, setErrors] = useState("");
  // const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const datePickerRef = useRef(null);

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

    const formattedStartDate = formData.startDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedEndDate = formData.endDate.toISOString().split("T")[0]; // YYYY-MM-DD

    await searchTour(formData.location, formattedStartDate, formattedEndDate);

    // if (resultTours.length > 0) {
    //   const queryParams = new URLSearchParams({
    //     location: formData.location,
    //     startDate: formattedStartDate,
    //     endDate: formattedEndDate,
    //   }).toString();
    //   setLoading(false);
    //   navigate(`/resultados?${queryParams}`);
    // }
  };

  useEffect(() => {
    console.log("🔄 Verificando resultTours:", resultTours); // Verifica si cambia

    if (!loading && resultTours.length > 0) {
      console.log("✅ Resultados encontrados. Redirigiendo...");
      const queryParams = new URLSearchParams({
        location: formData.location,
        startDate: formData.startDate.toISOString().split("T")[0],
        endDate: formData.endDate.toISOString().split("T")[0],
      }).toString();

      navigate(`/resultados?${queryParams}`);
    }
  }, [resultTours, loading, navigate]);

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
    if (formData.startDate && formData.endDate) {
      setErrors("");
    }
  }, [formData.startDate, formData.endDate]);
  return (
    <div className="flex flex-col w-full p-6 gap-6 bg-white rounded-lg shadow-md">
      <h3 className="font-medium text-[var(--color-default)] text-3xl text-center w-full">
        ¿Estás listo/a para tu próxima aventura en Latinoamérica?
      </h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="flex w-full gap-4 items-center justify-center">
          {/* Campo de ubicación */}
          <div className="relative w-1/2">
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Dónde
            </label>
            <button
              type="button"
              className="w-full bg-white border border-gray-300 px-4 py-2 rounded-lg text-left shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
              onClick={() => setFilteredPlaces(PAIS)}
            >
              {formData.location || "Selecciona un destino"}
            </button>
            {filteredPlaces.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-md">
                {filteredPlaces.map((place) => (
                  <li
                    key={`${place}-places3`}
                    className="p-2 cursor-pointer hover:bg-gray-200 transition-all"
                    onClick={() => handleSelectPlace(place)}
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Campo de fecha */}
          <div className="relative w-1/2">
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Cuándo
            </label>
            <button
              type="button"
              className="w-full bg-white border border-gray-300 px-4 py-2 rounded-lg text-left shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
              onClick={() => setShowDatePicker(true)}
            >
              {formData.startDate && formData.endDate
                ? `${formData.startDate.toLocaleDateString()} - ${formData.endDate.toLocaleDateString()}`
                : "dd/mm/aaaa"}
            </button>
            {showDatePicker && (
              <div
                ref={datePickerRef}
                className="absolute z-50 bg-white shadow-lg rounded-lg mt-2 p-2 border border-gray-300"
              >
                <DatePicker
                  selected={formData.startDate}
                  onChange={(update) => {
                    setFormData({
                      ...formData,
                      startDate: update[0],
                      endDate: update[1],
                    });
                  }}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  selectsRange
                  inline
                />
              </div>
            )}
          </div>
        </div>

        {errors && <p className="text-red-600 font-medium">{errors}</p>}

        <button
          type="submit"
          className="w-full rounded-2xl bg-[var(--color-secondary)] text-white font-normal text-center h-[40px] disabled:opacity-50 transition-all duration-300 ease-in-out hover:bg-[var(--color-emphasis)] disabled:hover:bg-[var(--color-secondary)]"
          disabled={!!errors || loading}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              Buscando...
            </div>
          ) : (
            "Buscar"
          )}
        </button>
      </form>
    </div>
  );
};
