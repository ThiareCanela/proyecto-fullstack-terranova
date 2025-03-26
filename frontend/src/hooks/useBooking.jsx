/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getTourAvailability } from "../apis/booking";

export const useAvailability = (id) => {
  const [dateAvailability, setDateAvailability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const getAvailability = async (id) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const availability = await getTourAvailability(id);
      if (!Array.isArray(availability)) {
        throw new Error("Respuesta inesperada del servidor");
      }
      // if (!availability || error) {
      //   setErrorMessage(
      //     "No se cuenta con fechas disponibles.\n Pronto estaremos Lanzando nuevas fechas"
      //   );
      //   return;
      // }
      setDateAvailability(availability);
    } catch (error) {
      console.error(error);
      // setErrorMessage(error);
      setDateAvailability([]);
      setErrorMessage(
        "No se cuenta con fechas disponibles.\n Pronto estaremos Lanzando nuevas fechas"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getAvailability(id);
    }
  }, [id]);

  return { dateAvailability, loading, errorMessage };
};
