import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../apis/login";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserOnLoad = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("🔹 Intentando recuperar perfil al cargar la app...");
        const userData = await obtenerPerfil();
        if (userData) {
          setUser(userData);
        }
      }
    };
    fetchUserOnLoad();
  }, []);

  const obtenerPerfil = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error(" No hay token en localStorage, no se puede obtener perfil.");
        return null;
      }

      const response = await fetch("http://localhost:8080/usuarios/perfil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener el perfil del usuario.");
      }

      const userData = await response.json();
      return {
        id: userData.id,
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        usuarioRole: userData.usuarioRole,
      };
    } catch (error) {
      console.error("Error en obtenerPerfil:", error.message);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      if (!result.token) {
        return { success: false, message: "No se pudo obtener el token." };
      }

      localStorage.setItem("token", result.token);
      const userData = await obtenerPerfil();
      if (!userData) {
        return { success: false, message: "No se pudo obtener el perfil del usuario." };
      }

      setUser(userData);
      return { success: true, token: result.token, user: userData };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const listarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token en localStorage, no se puede obtener la lista de usuarios.");
        return [];
      }
  
      console.log("🔹 Obteniendo lista de usuarios...");
      const response = await fetch("http://localhost:8080/usuarios/listar", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de usuarios.");
      }
  
      const usuarios = await response.json();
      console.log("Lista de usuarios obtenida:", usuarios);
      return usuarios;
    } catch (error) {
      console.error("Error en listarUsuarios:", error.message);
      return [];
    }
  };

  const cambiarRolUsuario = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("❌ No hay token en localStorage, no se puede cambiar el rol.");
            return { success: false, message: "No se encontró el token." };
        }
  
        console.log(`🔹 Cambiando rol del usuario con ID: ${id}...`);
        const response = await fetch(`http://localhost:8080/usuarios/cambiarRol/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
  
        if (!response.ok) {
            throw new Error("No se pudo cambiar el rol del usuario.");
        }
  
        console.log("✅ Rol cambiado exitosamente");
        return { success: true };
    } catch (error) {
        console.error("❌ Error en cambiarRolUsuario:", error.message);
        return { success: false, message: error.message };
    }
  };
  
  
  return (
    <AuthContext.Provider value={{ user, login, logout, error, listarUsuarios, cambiarRolUsuario, }}> 
      {children}
    </AuthContext.Provider>
  );
  
};

export const useAuth = () => useContext(AuthContext);
