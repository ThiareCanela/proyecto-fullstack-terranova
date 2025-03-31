import { useState, useEffect } from "react";
import { loginUser } from "../apis/login";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // **🔹 Al cargar la app, verifica si hay un token y actualiza el estado**
  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("🔹 Token encontrado en localStorage, verificando usuario...");
        const userData = await obtenerPerfil();
        if (userData) {
          setUser(userData);
        }
      }
    };
    checkUserSession();
  }, []);

  // **🔹 Función para obtener el perfil del usuario (sin guardar en localStorage)**
  const obtenerPerfil = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No hay token en localStorage, no se puede obtener perfil.");
        return null;
      }

      console.log("🔹 Token actual en localStorage:", token);

      const response = await fetch("http://localhost:8080/usuarios/perfil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener el perfil del usuario.");
      }

      const userData = await response.json();
      console.log("✅ Datos del usuario obtenidos:", userData);

      return {
        id: userData.id,
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        usuarioRole: userData.usuarioRole, // **Mantener solo en estado, no en localStorage**
      };
    } catch (error) {
      console.error("❌ Error en obtenerPerfil:", error.message);
      return null;
    }
  };
  const login = async (email, password) => {
    try {
      console.log("🔹 Iniciando login...");
  
      const result = await loginUser(email, password);
      console.log("🔹 Respuesta completa del login:", result);
  
      if (!result.token) {
        console.error("❌ No se recibió un token en la respuesta del login.");
        return { success: false, message: "No se pudo obtener el token." };
      }
  
      localStorage.setItem("token", result.token);
      console.log("🔹 Token guardado en localStorage:", localStorage.getItem("token"));
  
      console.log("🔹 Llamando a obtenerPerfil()...");
      const userData = await obtenerPerfil();
      console.log("🔹 Resultado de obtenerPerfil():", userData);
  
      if (!userData) {
        console.error("❌ No se pudo obtener el perfil del usuario.");
        return { success: false, message: "No se pudo obtener el perfil del usuario." };
      }
  
      // 🔹 Guarda el usuario en el estado inmediatamente
      setUser(userData);
  
      return { success: true, token: result.token, user: userData };
    } catch (error) {
      console.error("❌ Error en login:", error.message);
      return { success: false, message: error.message };
    }
  };
  
  

  // **🔹 Función de logout: elimina token y limpia el estado del usuario**
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    console.log("🔹 Usuario deslogueado, estado de `user` limpiado.");
  };

  return {
    login,
    logout,
    user,
    error,
  };
};
