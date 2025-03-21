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
      console.log("Datos recibidos de la API:", result);  // Verifica que los datos sean correctos
      setCategoryData(result || []);  // Asegúrate de que si no hay datos, pongas un arreglo vacío
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("categoryData", categoryData);
    getCategory();
  }, []);

  return { categoryData, loading, error, getCategory };
};
