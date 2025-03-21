import { useState, useEffect, useCallback } from "react";
import { searchCountryApi, searchTourApi } from "../apis/booking";

export const useSearchTour = () => {
  const [resultTours, setResultTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTour = useCallback(async (pais, fechaInicio, fechaFin) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchTourApi(pais, fechaInicio, fechaFin);
      if (data) setResultTours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  console.log(resultTours, "resultours");
  useEffect(() => {
    console.log("Verificando resultTours:", resultTours);
  }, [resultTours]);
  return { resultTours, loading, error, searchTour, setLoading };
};

export const useSearchCountry = (pais) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pais) return;

    const getTourByCountry = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await searchCountryApi(pais);
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Error obteniendo los tours.");
      } finally {
        setLoading(false);
      }
    };

    getTourByCountry();
  }, [pais]);

  return { data, loading, error };
};
