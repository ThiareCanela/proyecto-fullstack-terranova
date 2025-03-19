import { useEffect, useState } from "react";
import { getTourByIdApi, getToursApi, postAddTour } from "../apis/tour";
/* eslint-disable react-hooks/exhaustive-deps */
export const useTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTour, setNewTour] = useState(null);

  const getDataTours = async () => {
    setLoading(true);
    try {
      const data = await getToursApi();
      console.log(data, "data");
      setTours(data || []);
    } catch (err) {
      setError(err?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const createTour = async (tourData) => {
    setLoading(true);
    setError(null);
    try {
      const newTour = await postAddTour(tourData);
      setNewTour(newTour);
      return newTour;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataTours();
  }, []);

  return { tours, newTour, loading, error, createTour, getDataTours };
};

export const useTourById = (id) => {
  const [oneTour, setOneTour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      setLoading(true);
      try {
        const data = await getTourByIdApi(id);
        setOneTour(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  return { oneTour, loading, error, selectedId, setSelectedId };
};
