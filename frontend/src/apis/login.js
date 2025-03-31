export const loginUser = async (email, password) => {
  try {
    console.log("🔹 Enviando login con:", email, password);

    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("🔹 Estado HTTP:", response.status);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("❌ Error HTTP:", errorMessage);
      throw new Error(`Error HTTP ${response.status}: ${errorMessage}`);
    }

    const textResponse = await response.text();
    console.log("🔹 Respuesta cruda del servidor:", textResponse);

    try {
      const data = JSON.parse(textResponse);
      console.log("🔹 Respuesta JSON final desde loginUser:", data);
      return data; 
    } catch (error) {
      console.error("❌ Error al parsear JSON del login:", error.message);
      throw new Error("No se pudo procesar la respuesta del login.");
    }
  } catch (error) {
    console.error("❌ Error en loginUser:", error.message);
    return { error: error.message }; 
  }
};























  
  