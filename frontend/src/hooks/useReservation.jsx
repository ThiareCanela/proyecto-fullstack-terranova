/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { postCreateReservation } from "../apis/booking";

export const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [dataReservation, setDataReservation] = useState({});

  const handleCrearReserva = async () => {
    setLoading(true);
    setMensaje("");

    const reservaData = {
      usuarioId: 2,
      tourId: 6,
      fechaInicio: "2025-09-09",
      fechaFin: "2025-09-11",
      estado: "CONFIRMADA",
      numPersonas: 2,
      total: 800.0,
    };

    try {
      const response = await postCreateReservation(reservaData);
      setMensaje("Reserva creada con éxito");
      setDataReservation(response);
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear la reserva ");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCrearReserva,
    dataReservation,
    loading,
    mensaje,
  };
};
