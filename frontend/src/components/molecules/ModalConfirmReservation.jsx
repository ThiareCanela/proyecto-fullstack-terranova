/* eslint-disable react/prop-types */
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  MapPin,
  User,
} from "lucide-react";
import Modal from "../atoms/Modal";
import { useNavigate } from "react-router-dom";

export const ModalConfirmReservation = ({
  modal,
  setModal,
  tour,
  guests,
  startDate,
  endDate,
}) => {
  const navigate = useNavigate();
  return (
    <Modal isOpen={modal.isOpen} onClose={() => setModal({ isOpen: false })}>
      {modal.success ? (
        <>
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-center text-lg font-bold text-[var(--color-default)] mb-2">
            Reserva exitosa
          </h2>
          <div className="text-left text-gray-700 space-y-2">
            <p className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-[var(--color-emphasis)]" />
              <span>{tour.pais}</span>
            </p>
            <p className="text-lg font-bold text-[var(--color-default)]">
              {tour.titulo}
            </p>
            <p className="flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--color-emphasis)]" />
              {guests} personas
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-emphasis)]" />
              {startDate
                ? new Date(startDate).toLocaleDateString()
                : "No seleccionada"}{" "}
              -{" "}
              {endDate
                ? new Date(endDate).toLocaleDateString()
                : "No seleccionada"}
            </p>
          </div>
          <p className="text-center font-medium text-[var(--color-default)] mt-4">
            Tu reserva se realizó con éxito
          </p>
          <div className="w-full flex items-center justify-center">
            {" "}
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ok
            </button>
          </div>
        </>
      ) : (
        <>
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
          <p className="text-center font-bold">Error en la reserva</p>
          <p className="text-center font-medium text-[var(--color-default)] mt-4">
            Hubo un problema al procesar la reserva. Intenta nuevamente más
            tarde.
          </p>
        </>
      )}
    </Modal>
  );
};
