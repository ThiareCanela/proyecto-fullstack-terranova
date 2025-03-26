/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getTourAvailability } from "../apis/booking";

export const useAvailability = (id) => {
  const [dateAvailability, setDateAvailability] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAvailability = async (id) => {
    setLoading(true);
    try {
      const availability = await getTourAvailability(id);
      if (!Array.isArray(availability)) {
        throw new Error("Respuesta inesperada del servidor");
      }
      setDateAvailability(availability);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 404) {
        setDateAvailability([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getAvailability(id);
    }
  }, [id]);

  return { dateAvailability, loading };
};
