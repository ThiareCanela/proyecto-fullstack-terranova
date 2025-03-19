import { ArrowLeft, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { DescriptionDetail } from "../molecules/DescriptionDetail";
import { useNavigate, useParams } from "react-router-dom";
import { CharacteristicsSection } from "../molecules/CharacteristicsSection";
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTourById } from "../../hooks/useTour";
/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, message }) => {
  let icon, title, description;

  if (message.includes("Reserva exitosa")) {
    icon = <CheckCircle className="w-12 h-12 text-green-500" />;
    title = "Reserva exitosa";
    description = "Tu reserva se ha realizado con éxito.";
  } else if (message.includes("Fecha no disponible")) {
    icon = <AlertCircle className="w-12 h-12 text-yellow-500" />;
    title = "Fecha no Disponible";
    description = "La fecha de inicio debe ser anterior a la de fin.";
  } else if (message.includes("Error en la reserva")) {
    icon = <XCircle className="w-12 h-12 text-red-500" />;
    title = "Error en la reserva";
    description =
      "Hubo un problema con el servidor al procesar la fecha. Intenta nuevamente.";
  } else {
    icon = null;
    title = "Error";
    description = message;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 relative transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-90"
        }`}
      >
        <div className="flex flex-col items-center">
          {icon}
          <h2 className="text-lg font-bold text-gray-800 mt-3">{title}</h2>
          <p className="text-gray-600 mt-2 text-center">{description}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DetailCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { oneTour } = useTourById(id);
  const datePickerRef = useRef(null);

  const handleReserve = () => {
    if (!startDate || !endDate) {
      setModalMessage("Error en la reserva: Selecciona ambas fechas.");
      setShowModal(true);
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setModalMessage(
        "Fecha no disponible: La fecha de inicio debe ser anterior a la de fin."
      );
      setShowModal(true);
      return;
    }
    setModalMessage("Reserva exitosa");
    setShowModal(true);
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

  if (!oneTour) {
    return <div>Error al cargar el tour</div>;
  }

  return (
    <div className="flex flex-col bg-[var(--color-primary)]">
      <header className="flex p-6 flex-col-reverse gap-4 md:gap-6 justify-between mt-[80px]  md:flex-row text-center md:text-left w-full">
        <h1 className="font-bold uppercase text-2xl md:text-3xl text-[var(--color-default)] pl-4">
          {oneTour.titulo}
        </h1>
        <button
          className="flex items-center justify-start  bg-transparent border-none gap-2 text-[var(--color-emphasis)] text-sm font-medium w-full md:w-auto self-start md:self-auto px-4 md:px-0 ml-4 md:ml-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver atrás
        </button>
      </header>

      <main className="flex flex-col w-full p-4 md:py-8 md:px-16 gap-6">
        <div className="grid grid-cols-[66%_33%] gap-4 w-full max-w-full">
          <img
            className="w-full object-cover h-full md:h-76 rounded-lg"
            src={oneTour.imagenes[0].urlImagen}
            alt={oneTour.titulo}
          />
          <div className="grid grid-rows-2 gap-4 overflow-hidden">
            <img
              className="w-full object-cover h-56 md:h-36 rounded-lg"
              src={oneTour.imagenes[1].urlImagen}
              alt={oneTour.titulo}
            />
            <img
              className="w-full object-cover h-56 md:h-36 rounded-lg"
              src={oneTour.imagenes[2].urlImagen}
              alt={oneTour.titulo}
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-10 items-start">
          <div className="md:w-[65%] text-center md:text-left pr10">
            <DescriptionDetail description={oneTour.descripcion} />
          </div>

          <div className="md:w-[33%] bg-white shadow-lg rounded-2xl p-6 border border-[var(--color-secondary)] text-left w-full md:ml-auto">
            <h2 className="text-lg md:text-xl font-bold mb-5 text-center text-[var(--color-default)]">
              Desde{" "}
              <span className="text-[var(--color-emphasis)]">
                ${oneTour.precio}
              </span>{" "}
              por persona
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
                <div
                  ref={datePickerRef}
                  className="absolute z-50 bg-white shadow-lg rounded-lg mt-2"
                >
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
                {[...Array(5).keys()].map((i) => (
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
              Reservar
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

        <div className="flex justify-center items-center w-full min-h-[20vh]">
          <CharacteristicsSection characteristics={oneTour.caracteristicas} />
        </div>
      </main>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </div>
  );
}
