/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { searchTourApi } from "../apis/booking";

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
