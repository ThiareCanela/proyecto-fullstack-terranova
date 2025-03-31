export const registrarUsuario = async (usuario) => {
  try {
    const respuesta = await fetch(`${API_URL_BASE}/usuarios/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!respuesta.ok) {
      const errorMessage = await respuesta.text();
      throw new Error(errorMessage || "Error al registrar usuario");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return null;
  }
};

