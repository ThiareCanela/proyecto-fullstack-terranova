import { useState } from "react";
import { loginUser } from "../apis/login";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Error en el login");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      return { success: true, token: data.token };
    } catch (error) {
      console.error("❌ Error en login:", error.message);
      return { success: false, message: error.message };
    }
};


  return {
    login,
    user,
    error,
  };
};
