import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../atoms/Modal';
import { InputField } from '../atoms/InputField';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Register = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: 'Juanito Pérez',
      profilePicture: 'https://i.pinimg.com/474x/c2/2c/d7/c22cd75c1b29c4e7c7f718613dc2ff3f.jpg'
    };
    login(userData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="flex flex-col space-y-6 p-6" onSubmit={handleSubmit}>
        <img src={logo} alt="Terranova Logo" className="h-20 w-auto mx-auto" />
        <h2 className="text-center text-2xl font-bold mt-4">Regístrate en Terranova</h2>
        <InputField label="Nombre" placeholder="Tu nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField label="Apellidos" placeholder="Tus apellidos" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <InputField label="Correo Electrónico" placeholder="Tu correo electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField label="Contraseña" placeholder="Tu contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-[var(--color-emphasis)] text-white px-4 py-2 rounded transition-transform transform hover:scale-105 active:scale-95 cursor-pointer" type="submit">
          Registrarse
        </button>
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta? <a href="#" className="text-[var(--color-emphasis)]">Inicia sesión aquí</a>
        </p>
      </form>
    </Modal>
  );
};

Register.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Register;
