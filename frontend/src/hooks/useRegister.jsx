import { useState } from "react";
import { API_TERRANOVA } from "../constants/endpoints";

export const useRegister = () => {
  const [data, setData] = useState([]);
  const createUser = async (usuario) => {
    try {
      const respuesta = await fetch(`api/${API_TERRANOVA.REGISTER_USER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (!respuesta.ok) {
        throw new Error("Error al registrar usuario");
      }

      const res = await respuesta.json();
      console.log("Usuario registrado:", data);
      setData(res);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    data,
    createUser,
  };
};
