/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { searchCountryApi, searchTourApi } from "../apis/booking";

export const useSearchTour = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataResult, setDataResult] = useState([]);

  const searchTours = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      const result = await searchTourApi(filters);

      if (result.error) {
        throw new Error(result.error);
      }

      setDataResult(result.payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { dataResult, loading, error, searchTours, setLoading };
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
