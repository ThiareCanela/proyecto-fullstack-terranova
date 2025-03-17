import { useState } from "react";

export const useAuth = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
  });

  //   const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de éxito/error

  //   // Maneja los cambios en los inputs del formulario
  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   // Maneja el envío del formulario
  //   const handleSubmit = async (e) => {
  //     e.preventDefault(); // Evita que la página se recargue

  //     if (formData.password !== formData.password2) {
  //       setMensaje("❌ Las contraseñas no coinciden");
  //       return;
  //     }

  //   };

  const createUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/usuarios/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convertimos los datos a JSON
      });

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result);
      }

      // setMensaje("✅ Usuario registrado con éxito!");
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        password2: "",
      }); // Limpiar formulario
    } catch (error) {
      console.log(error);
      // setMensaje("❌ Error al registrar: " + error.message);
    }
  };

  //   const createUser = async (usuario) => {
  //     const token = localStorage.getItem("token");
  //     // http://localhost:8080
  //     try {
  //       const respuesta = await fetch(
  //         "http://localhost:8080/usuarios/registrar",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: JSON.stringify(usuario),
  //         }
  //       );

  //       if (!respuesta.ok) {
  //         throw new Error("Error al registrar usuario");
  //       }

  //       return await respuesta.json();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

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

      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return {
    login,
    createUser,
  };
};
