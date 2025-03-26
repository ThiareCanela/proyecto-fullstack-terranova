/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { get_categories_api } from "../apis/categories";

export const useCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategory = async () => {
    setLoading(true);
    try {
      const result = await get_categories_api();
      setCategoryData(result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return { categoryData, loading, error, getCategory };
};
