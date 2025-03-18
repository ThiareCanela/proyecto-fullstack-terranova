import { API_TERRANOVA, API_URL_BASE } from "../constants/endpoints";

export const registrarUsuario = async (usuario) => {
  try {
    const respuesta = await fetch(
      `${API_URL_BASE}/${API_TERRANOVA.REGISTER_USER}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      }
    );

    if (!respuesta.ok) {
      throw new Error("Error al registrar usuario");
    }

    const data = await respuesta.json();
    console.log("Usuario registrado:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
