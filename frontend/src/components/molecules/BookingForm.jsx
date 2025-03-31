/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PAIS } from "../../constants";
import { useSearchTour } from "../../hooks/useSearchTour";

export const BookingForm = () => {
  const navigate = useNavigate();
  const { dataResult, loading, searchTours } = useSearchTour();
  const [formData, setFormData] = useState({
    pais: "",
    fechaInicio: null,
    fechaFin: null,
  });
  const [errors, setErrors] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const datePickerRef = useRef(null);

  console.log(dataResult, "dataresult");

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

    const filters = {
      pais: formData.pais,
      fechaInicio: formData.fechaInicio.toISOString().split("T")[0],
      fechaFin: formData.fechaFin.toISOString().split("T")[0],
    };

    await searchTours(filters);
    navigate(
      `/resultados?pais=${filters.pais}&fechaInicio=${filters.fechaInicio}&fechaFin=${filters.fechaFin}`
    );
  };

  useEffect(() => {
    if (!loading && dataResult?.length > 0) {
      const queryParams = new URLSearchParams({
        pais: formData.pais,
        fechaInicio: formData.fechaInicio.toISOString().split("T")[0],
        fechaFin: formData.fechaFin.toISOString().split("T")[0],
      }).toString();

      navigate(`/resultados?${queryParams}`);
    }
  }, [dataResult, loading, navigate]);

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
    if (formData.fechaInicio && formData.fechaFin) {
      setErrors("");
    }
  }, [formData.fechaInicio, formData.fechaFin]);
  return (
    <div className="flex flex-col w-full p-6 gap-6 bg-white rounded-lg shadow-md">
      <h3 className="font-medium text-[var(--color-default)] text-3xl text-center w-full">
        ¿Estás listo/a para tu próxima aventura en Latinoamérica?
      </h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="flex w-full gap-4 items-center justify-center">
          <div className="relative w-1/2">
            <label
              className="text-sm font-semibold text-gray-700 block mb-1"
              htmlFor="location"
            >
              Dónde
            </label>
            <button
              id="location"
              type="button"
              className="w-full bg-white border border-gray-300 px-4 py-2 rounded-lg text-left shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
              onClick={() => setFilteredPlaces(PAIS)}
            >
              {formData.pais || "Elige un destino"}
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

          <div className="relative w-1/2">
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Cuándo
            </label>
            <button
              type="button"
              className="w-full bg-white border border-gray-300 px-4 py-2 rounded-lg text-left shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
              onClick={() => setShowDatePicker(true)}
            >
              {formData.fechaInicio && formData.fechaFin
                ? `${formData.fechaInicio.toLocaleDateString()} - ${formData.fechaFin.toLocaleDateString()}`
                : "Indica las fechas"}
            </button>
            {showDatePicker && (
              <div
                ref={datePickerRef}
                className="absolute z-50 bg-white shadow-lg rounded-lg mt-2 p-2 border border-gray-300"
              >
                <DatePicker
                  selected={formData.fechaInicio}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setFormData({
                      ...formData,
                      fechaInicio: start,
                      fechaFin: end,
                    });
                    setShowDatePicker(false);
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
