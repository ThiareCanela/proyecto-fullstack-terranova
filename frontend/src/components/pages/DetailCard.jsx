import { ArrowLeft } from "lucide-react";
import { DescriptionDetail } from "../molecules/DescriptionDetail";
import { CARACTERISTICAS, DESCRIPTIONS } from "../../constants";
import { useNavigate } from "react-router-dom";
import { CharacteristicsSection } from "../molecules/CharacteristicsSection";
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DetailCard() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const handleReserve = () => {
    if (!startDate || !endDate) {
      alert("Error en la reserva: Selecciona ambas fechas.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      alert("Fecha no disponible: La fecha de inicio debe ser anterior a la de fin.");
      return;
    }

    // Navegar a la página de detalles de reserva con parámetros
    navigate("/reservation-detail", {
      state: { startDate, endDate, guests },
    });
  };

  const handleClickOutside = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
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

  return (
    <div className="flex flex-col bg-[var(--color-primary)]">
      <header className="flex p-6 gap-4 md:gap-6 justify-between mt-[80px] flex-col md:flex-row text-center md:text-left w-full">
        <h1 className="font-bold uppercase text-2xl md:text-3xl text-[var(--color-default)] pl-4">
          Retiro en el amazonas
        </h1>
        <button
          className="flex items-center bg-transparent border-none justify-center gap-2 text-[var(--color-emphasis)] text-sm font-medium w-full md:w-auto self-start md:self-auto px-4 md:px-0 ml-4 md:ml-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver atrás
        </button>
      </header>

      <main className="flex flex-col w-full p-4 md:py-8 md:px-16 gap-6">
        <div className="grid grid-cols-[66%_33%] gap-4 w-full max-w-full">
          <img
            className="w-full object-cover h-full md:h-76 rounded-lg"
            src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/b/r/brasil35.jpg?crop=0%2C231%2C4000%2C2200&wid=4000&hei=2200&scl=1.0"
            alt="Sunset Beach"
          />
          <div className="grid grid-rows-2 gap-4 overflow-hidden">
            <img
              className="w-full object-cover h-56 md:h-36 rounded-lg"
              src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/bzngtenckauetvefmdai"
              alt="Sunset Beach"
            />
            <img
              className="w-full object-cover h-56 md:h-36 rounded-lg"
              src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/vs0bb8a9jx5w7bteecsj"
              alt="Sunset Beach"
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-10 items-start">
          <div className="md:w-[65%] text-center md:text-left pr10">
            <DescriptionDetail
              description={DESCRIPTIONS}
              subtitle={"Una isla que te transportará"}
            />
          </div>

          <div className="md:w-[33%] bg-white shadow-lg rounded-2xl p-6 border border-[var(--color-secondary)] text-left w-full md:ml-auto">
            <h2 className="text-lg md:text-xl font-bold mb-5 text-center text-[var(--color-default)]">
              Desde <span className="text-[var(--color-emphasis)]">$90</span> por persona
            </h2>

            <div className="mb-4 relative">
              <label className="text-sm font-semibold text-[var(--color-default)] block mb-1">
                Selecciona fechas
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={startDate ? startDate.toLocaleDateString() : ""}
                  readOnly
                  className="border p-2 rounded-lg text-sm w-full"
                  placeholder="Fecha de inicio"
                  onClick={() => setShowDatePicker(true)}
                />
                <input
                  type="text"
                  value={endDate ? endDate.toLocaleDateString() : ""}
                  readOnly
                  className="border p-2 rounded-lg text-sm w-full"
                  placeholder="Fecha de fin"
                  onClick={() => setShowDatePicker(true)}
                />
              </div>
              {showDatePicker && (
                <div ref={datePickerRef} className="absolute z-50 bg-white shadow-lg rounded-lg mt-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(update) => {
                      setDateRange(update);
                      setShowDatePicker(false);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold text-[var(--color-default)] block mb-1">
                Número de personas
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="border p-2 rounded-lg text-sm w-full"
              >
                {[...Array(5).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleReserve}
              className="bg-[var(--color-emphasis)] text-white font-medium text-sm px-6 py-3 rounded-xl w-full transition-all hover:bg-[var(--color-secondary)] hover:scale-105"
            >
              Continuar
            </button>

            <div className="mt-4 flex justify-between items-center">
              <label className="text-sm font-semibold text-[var(--color-default)]">
                Precio total
              </label>
              <p className="text-[var(--color-emphasis)] font-bold text-lg">
                ${guests * 90}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center min-h-[20vh]">
          <CharacteristicsSection characteristics={CARACTERISTICAS} />
        </div>
      </main>
    </div>
  );
}
