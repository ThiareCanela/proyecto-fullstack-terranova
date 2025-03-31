import { useState } from "react";
import { API_TERRANOVA, API_URL_BASE } from "../constants/endpoints";

export const useRegister = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const createUser = async (usuario) => {
    try {
      const params = new URLSearchParams({
        nombre: usuario.name,
        apellido: usuario.lastName,
        email: usuario.email,
        password: usuario.password,
      });
  
      console.log("Datos enviados al backend:", params.toString());
  
      const respuesta = await fetch(`${API_URL_BASE}/usuarios/registrar?${params.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      if (!respuesta.ok) {
        const errorMessage = await respuesta.text();
        throw new Error(errorMessage || "Error al registrar usuario");
      }
  
      const res = await respuesta.text(); // <-- Ahora tratamos la respuesta como texto
      console.log("Respuesta del backend:", res);
      setData({ message: res }); // Guardamos el mensaje en el estado
      return { message: res };
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
      return null;
    }
  };
  
  

  return {
    data,
    createUser,
    error,
  };
};

