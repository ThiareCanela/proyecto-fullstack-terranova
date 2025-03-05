import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../atoms/Modal";
import { InputField } from "../atoms/InputField";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, messageError, setMessageError } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      onClose();
      setEmail("");
      setPassword("");
    } else {
      setMessageError("Los datos ingresados no son correctos.");
    }
    setMessageError("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backgroundOpacity="10%">
      <form className="flex flex-col space-y-6 p-6" onSubmit={handleSubmit}>
        <img src={logo} alt="Terranova Logo" className="h-20 w-auto mx-auto" />
        <h2 className="text-center text-2xl font-bold mt-4">
          Bienvenido a Terranova
        </h2>
        <InputField
          label="Correo Electrónico"
          placeholder="Correo Electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label="Contraseña"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {messageError && (
          <p className="text-red-600 text-sm text-center w-full my-5">
            {messageError}
          </p>
        )}
        <a href="#" className="text-[var(--color-emphasis)] text-right">
          ¿Olvidaste tu contraseña?
        </a>
        <button
          className="bg-[var(--color-secondary)] text-white px-4 py-2 rounded transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>
    </Modal>
  );
};

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Login;
