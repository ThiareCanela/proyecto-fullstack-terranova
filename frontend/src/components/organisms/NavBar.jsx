import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";
import Register from "../molecules/Register";
import Login from "../molecules/Login";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [activeModal, setActiveModal] = useState(null);
  console.log("Usuario en Navbar:", user);
  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const closeModal = () => setActiveModal(null);

  const getInitials = (name, lastName) => {
    if (!name || !lastName) return "";
    return `${name[0]}${lastName[0]}`.toUpperCase();
  };

  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-3">
        <img src={logo} alt="Terranova Logo" className="h-8 w-auto" />
        <span className="text-[var(--color-default)] font-bold text-lg">
          Terranova
        </span>
      </Link>

      <div className="hidden md:flex space-x-4 relative">
        {user ? (
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <div className="h-12 w-12 rounded-full flex items-center text-2xl font-bold justify-center bg-gray-200">
              {getInitials(user.name, user.lastName)}
            </div>
            <span className="text-[var(--color-default)]">{user.name}</span>
          </div>
        ) : (
          <>
            <button
              onClick={openRegister}
              className="bg-[var(--color-secondary)] text-white px-4 py-2 rounded"
            >
              Crear Cuenta
            </button>
            <button
              onClick={openLogin}
              className="bg-[var(--color-emphasis)] text-white px-4 py-2 rounded"
            >
              Iniciar Sesión
            </button>
          </>
        )}
        {profileMenuOpen && user && (
          <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-4 flex flex-col space-y-3 w-48">
            <button
              className="flex items-center space-x-2 py-2"
              onClick={() => {
                console.log("Perfil");
                setProfileMenuOpen(false);
                navigate("/perfil");
              }}
            >
              <User size={20} />
              <span>Mi perfil</span>
            </button>
            {isAdmin && (
              <button
                className="flex items-center space-x-2 py-2"
                onClick={() => {
                  console.log("Administrar");
                  setProfileMenuOpen(false);
                  navigate("/panel-administrador");
                }}
              >
                <Settings size={20} />
                <span>Administrar</span>
              </button>
            )}
            <button
              className="flex items-center space-x-2 text-red-500 py-2"
              onClick={logout}
            >
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>

      <Register isOpen={activeModal === "register"} onClose={closeModal} />
      <Login isOpen={activeModal === "login"} onClose={closeModal} />

      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-md rounded-md p-4 flex flex-col space-y-3 md:hidden w-48">
          {user ? (
            <>
              <div className="flex items-center space-x-3 border-b pb-2">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
                <span className="text-[var(--color-default)] font-medium">
                  {user.name}
                </span>
              </div>
              <Link
                to="/perfil"
                className="flex items-center space-x-2 text-[var(--color-default)] py-2"
              >
                <User size={20} />
                <span>Mi perfil</span>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 text-[var(--color-default)] py-2"
                >
                  <Settings size={20} />
                  <span>Administrar</span>
                </Link>
              )}
              <button
                className="flex items-center space-x-2 text-red-500 py-2"
                onClick={logout}
              >
                <LogOut size={20} />
                <span>Cerrar sesión</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={openRegister}
                className="bg-[var(--color-secondary)] text-white px-4 py-2 rounded"
              >
                Crear Cuenta
              </button>
              <button
                onClick={openLogin}
                className="bg-[var(--color-emphasis)] text-white px-4 py-2 rounded"
              >
                Iniciar Sesión
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
