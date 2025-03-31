import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PropTypes from "prop-types";
import Modal from "../atoms/Modal";
import { InputField } from "../atoms/InputField";
import logo from "../../assets/logo.png";

const Register = ({ isOpen, onClose }) => {
  const { register } = useAuth(); // 👈 Asegurarnos de que register viene del contexto
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    console.log("🔹 Intentando registrar (formData antes de enviar):", formData);

    const result = await register(formData);

    console.log("🔹 Respuesta del backend en handleSubmit:", result);

    if (result.success) {
      console.log("✅ Registro exitoso");
      onClose();
      setFormData({ nombre: "", apellido: "", email: "", password: "" });
    } else {
      console.error("❌ Error en el registro:", result.message);
      setErrorMessage(result.message || "Error al registrar usuario.");
    }
};




  return (
    <Modal isOpen={isOpen} onClose={onClose} backgroundOpacity="10%">
      <form className="flex flex-col space-y-6 p-6" onSubmit={handleSubmit}>
        <img src={logo} alt="Terranova Logo" className="h-20 w-auto mx-auto" />
        <h2 className="text-center text-2xl font-bold mt-4">
          Crea tu cuenta
        </h2>

        <InputField
          label="Nombre"
          placeholder="Nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <InputField
          label="Apellido"
          placeholder="Apellido"
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <InputField
          label="Correo Electrónico"
          placeholder="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Contraseña"
          placeholder="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {errorMessage && (
          <p className="text-red-600 text-sm text-center w-full my-5">
            {errorMessage}
          </p>
        )}

        <button
          className="bg-[var(--color-secondary)] text-white px-4 py-2 rounded transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
          type="submit"
        >
          Registrarse
        </button>
      </form>
    </Modal>
  );
};

Register.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Register;
