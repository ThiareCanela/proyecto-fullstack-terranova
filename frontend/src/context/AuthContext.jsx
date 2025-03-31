/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser({ email: "usuario-autenticado" });
    }
  }, []);

  const register = async (userData) => {
    try {
      const params = new URLSearchParams({
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        password: userData.password,
      });

      console.log("🔹 Intentando registrar:", params.toString());

      const response = await fetch("http://localhost:8080/usuarios/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const data = await response.text();
      console.log("✅ Respuesta del backend:", data);

      if (!response.ok) {
        throw new Error(data);
      }

      return { success: true, message: "Usuario registrado con éxito" };
    } catch (error) {
      console.error("❌ Error en el registro:", error.message);
      return { success: false, message: error.message };
    }
  };

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
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser({ email });

      return { success: true };
    } catch (error) {
      console.error("❌ Error en login:", error.message);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ messageError, setMessageError, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
