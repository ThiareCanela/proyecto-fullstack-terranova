export const registrarUsuario = async (usuario) => {
  try {
    console.log("📌 Enviando datos al backend (registrarUsuario):", usuario);

    const respuesta = await fetch(`${API_URL_BASE}/usuarios/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 👈 Ahora enviamos JSON
      },
      body: JSON.stringify(usuario), // 👈 Convertimos a JSON
    });

    console.log("🔹 Código de estado HTTP:", respuesta.status);
    console.log("🔹 Headers de la respuesta:", [...respuesta.headers.entries()]);

    const responseText = await respuesta.text();
    console.log("🔹 Respuesta cruda del backend:", responseText);

    if (!respuesta.ok) {
      console.error("❌ Error en respuesta del backend:", responseText);
      throw new Error(responseText || "Error al registrar usuario");
    }

    return { success: true, data: responseText };
  } catch (error) {
    console.error("❌ Error en registrarUsuario:", error.message);
    return { success: false, message: error.message };
  }
};

