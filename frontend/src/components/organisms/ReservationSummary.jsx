/* eslint-disable react/prop-types */
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { CharacteristicsSection } from "../molecules/CharacteristicsSection";
import { ImageGallery } from "../molecules/ImageGallery";

export const ReservationSummary = ({ tour, guests, startDate, endDate }) => {
  const totalPrice = guests * tour.precio;

  return (
    <section className="md:w-5/12 bg-white shadow-lg rounded-2xl p-6 border border-[var(--color-secondary)]">
      <ImageGallery type="Reservation" images={tour.imagenes} />

      <div className="my-4">
        <h2 className="text-xl font-bold text-[var(--color-default)] mb-4">
          {tour.titulo}
        </h2>
        <div className="flex items-center text-gray-600 gap-2">
          <MapPin className="w-5 h-5 text-[var(--color-emphasis)]" />
          <span>{tour.pais}</span>
        </div>
      </div>

      <div className="text-gray-700 space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[var(--color-emphasis)]" />
          <span>
            <strong>{guests}</strong> personas
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[var(--color-emphasis)]" />
          <span>
            {startDate
              ? new Date(startDate).toLocaleDateString()
              : "No seleccionada"}{" "}
            -{" "}
            {endDate
              ? new Date(endDate).toLocaleDateString()
              : "No seleccionada"}
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

      <div className="flex justify-between items-center text-lg font-semibold text-[var(--color-default)]">
        <span>Precio total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </section>
  );
};
