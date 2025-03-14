import { ArrowLeft, Star } from "lucide-react";
import { DescriptionDetail } from "../molecules/DescriptionDetail";
import { CARACTERISTICAS, DESCRIPTIONS } from "../../constants";
import { useNavigate } from "react-router-dom";
import { CharacteristicsSection } from "../molecules/CharacteristicsSection";
import { useState } from "react";

export default function DetailCard() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleConsult = () => {
    if (!startDate || !endDate) {
      setMessage("Error en la reserva: Selecciona ambas fechas.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setMessage("Fecha no disponible: La fecha de inicio debe ser anterior a la de fin.");
      return;
    }
    setMessage("Reserva exitosa: Tu viaje ha sido reservado.");
  };

  return (
    <div className="flex flex-col bg-[var(--color-primary)]">
      <header className="flex p-6 gap-4 justify-between mt-[80px] flex-col items-center md:flex-row text-center md:text-left">
        <h1 className="font-bold uppercase text-2xl md:text-3xl text-[var(--color-default)]">SUNSET BEACH - HAWAI</h1>
        <button
          className="flex items-center bg-transparent border-none justify-center gap-2 text-[var(--color-emphasis)] text-sm font-medium"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver atrás
        </button>
      </header>

      <main className="flex flex-col w-full p-4 md:py-8 md:px-16 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <img
            className="w-full object-cover object-center h-48 md:h-64 rounded-lg"
            src="https://i.natgeofe.com/k/f576c284-661a-4046-ba51-fa95699e1a8b/hawaii-beach.png"
            alt="Sunset Beach"
          />
          <div className="grid grid-rows-2 gap-4">
            <img
              className="w-full object-cover object-center h-24 md:h-32 rounded-lg"
              src="https://delivery.gfobcontent.com/api/public/content/89dfacceb8eb4f5d8dc2aaff1e60ced6?v=5f8e8061"
              alt="Imagen Secundaria 1"
            />
            <img
              className="w-full object-cover object-center h-24 md:h-32 rounded-lg"
              src="https://www.jetstar.com/_/media/inspiration-hub/article-images/19oct/hawaii-honolulu-need-to-know/hero_hawaii_honolulu.jpg?rev=cf08627cd0164b12b48d7e2af03abec6&w=1050&rc=1&cw=1050&ch=590&cx=55&cy=0&hash=67AF8851437B4D5433D7F1886992F8120F580B73"
              alt="Imagen Secundaria 2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-default)]">Calificación:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={`cursor-pointer transition-all ${
                  (hoverRating || rating) >= star ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-400"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-2/5 text-center md:text-left pr-16">
            <DescriptionDetail description={DESCRIPTIONS} subtitle={"Una isla que te transportará"} />
          </div>

          <div className="md:w-1/3 bg-white shadow-md rounded-lg p-4 border border-[var(--color-secondary)] text-left w-full md:ml-auto">
            <h2 className="text-base md:text-lg font-semibold mb-4 text-[var(--color-default)]">Desde $90 por persona</h2>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-[var(--color-default)]">Fecha de inicio</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-[var(--color-secondary)] p-2 rounded text-sm w-full"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-[var(--color-default)]">Fecha de fin</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-[var(--color-secondary)] p-2 rounded text-sm w-full"
                />
              </div>
            </div>

            <button
              onClick={handleConsult}
              className="bg-[var(--color-emphasis)] text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-[var(--color-secondary)] transition-all w-full mt-2"
            >
              Consultar
            </button>
            {message && (
              <p className={`text-sm mt-2 ${message.includes("exitosa") ? "text-green-500" : "text-red-500"}`}>{message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center w-full min-h-[20vh]">
          <CharacteristicsSection characteristics={CARACTERISTICAS} />
        </div>
      </main>
    </div>
  );
}