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

    const data = await response.json();
    console.log("🔹 Respuesta JSON final desde loginUser:", data);

    return data; // 👈 Nos aseguramos de devolver siempre la respuesta
  } catch (error) {
    console.error("❌ Error en loginUser:", error.message);
    return { error: error.message }; // 👈 En vez de `null`, retornar un objeto con error
  }
};






















  
  