import { useState } from "react";

export const useRegisterlo = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    return password.length >= 6 && /\d/.test(password);
  };

  const handleRegister = () => {
    if (!validatePassword(formData.password)) {
      setError("La contraseña debe tener al menos 6 caracteres y un número.");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(formData));
  };

  return {
    error,
    handleChange,
    handleRegister,
  };
};
