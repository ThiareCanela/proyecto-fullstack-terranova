import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../atoms/Modal";
import { InputField } from "../atoms/InputField";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const Register = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, messageError, setMessageError } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      role: "user",
    };

    if (
      !newUser.name ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.password
    ) {
      setMessageError("Por favor completa todos los campos.");
      return;
    }

    const success = register(newUser);
    if (success) {
      onClose();
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMessageError("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="flex flex-col space-y-6 p-6" onSubmit={handleSubmit}>
        <img src={logo} alt="Terranova Logo" className="h-20 w-auto mx-auto" />
        <h2 className="text-center text-2xl font-bold mt-4">
          Regístrate en Terranova
        </h2>
        <InputField
          label="Nombre"
          name="name"
          placeholder="Tu nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Apellidos"
          name="lastName"
          placeholder="Tus apellidos"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputField
          label="Correo Electrónico"
          name="email"
          placeholder="Tu correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Contraseña"
          name="password"
          placeholder="Tu contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {messageError && (
          <p className="text-red-600 text-sm text-center w-full my-5">
            {messageError}
          </p>
        )}
        <button
          className="bg-[var(--color-emphasis)] text-white px-4 py-2 rounded transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
          type="submit"
        >
          Registrarse
        </button>
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <a href="#" className="text-[var(--color-emphasis)]">
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </Modal>
  );
};

Register.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Register;
