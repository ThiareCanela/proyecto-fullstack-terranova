/* eslint-disable react/prop-types */
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { CharacteristicsSection } from "../molecules/CharacteristicsSection";
import { ImageGallery } from "../molecules/ImageGallery";



const parseDateWithoutTimezone = (date) => {
  if (!date) return null;
  if (typeof date === "string") {
    const [year, month, day] = date.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  return date; // ya es un objeto Date
};


export const ReservationSummary = ({
  tour,
  guests,
  startDate,
  endDate,
  isCompact = false, // permite ajustar estilos si viene desde MisReservas
}) => {
  const totalPrice = guests * tour.precio;

  return (
    <section
      className={`bg-white shadow-lg rounded-2xl border border-[var(--color-secondary)] ${
        isCompact ? "p-4 flex flex-col h-full" : "md:w-5/12 p-6"
      }`}
    >
      <div className={isCompact ? "aspect-video overflow-hidden rounded-md mb-4" : ""}>
        <ImageGallery type="Reservation" images={tour.imagenes} />
      </div>

      <div className="mb-4">
        <h2 className={`font-bold text-[var(--color-default)] ${isCompact ? "text-base" : "text-xl"} mb-2`}>
          {tour.titulo}
        </h2>
        <div className="flex items-center text-gray-600 gap-2 text-sm">
          <MapPin className="w-5 h-5 text-[var(--color-emphasis)]" />
          <span>{tour.pais}</span>
        </div>
      </div>

      <div className="text-gray-700 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[var(--color-emphasis)]" />
          <span>
            <strong>{guests}</strong> personas
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[var(--color-emphasis)]" />
          <span>
            {startDate ? parseDateWithoutTimezone(startDate).toLocaleDateString() : "No seleccionada"} -{" "}
            {endDate ? parseDateWithoutTimezone(endDate).toLocaleDateString() : "No seleccionada"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[var(--color-emphasis)]" />
          <span>{tour.duracion} días</span>
        </div>
      </div>

      <div className="mt-4">
        <CharacteristicsSection characteristics={tour.caracteristicas} />
      </div>

      <hr className="my-4 border-t border-gray-300" />

      <div className="flex justify-between items-center font-semibold text-[var(--color-default)] text-sm">
        <span>Precio total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </section>
  );
};
