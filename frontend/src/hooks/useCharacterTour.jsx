import { useEffect, useState } from "react";
import { charactTourApi } from "../apis/characTour";

export const useCharacterTour = () => {
  const [characTour, setCharacTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDataTours = async () => {
    setLoading(true);
    try {
      const data = await charactTourApi();
      setCharacTour(data || []);
    } catch (err) {
      setError(err?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataTours();
  }, []);

  return { characTour, loading, error, getDataTours };
};
