import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import Register from "../molecules/Register";
import Login from "../molecules/Login";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../constants/endpoints";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const closeModal = () => setActiveModal(null);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    setMenuOpen(false);
    setIsAdmin(false); // 🔹 Resetear isAdmin al cerrar sesión
    navigate("/");
  };

  const getInitials = (name, lastName) => {
    if (!name || !lastName) return "";
    return `${name[0]}${lastName[0]}`.toUpperCase();
  };

  // **🔹 Función para obtener el rol de usuario**
  const fetchUserRole = async () => {
    console.log("🔹 Ejecutando fetchUserRole...");

    if (!user) {
      console.log("❌ No hay usuario, estableciendo isAdmin en false.");
      setIsAdmin(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("❌ No hay token, estableciendo isAdmin en false.");
        setIsAdmin(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("❌ Error obteniendo el rol del usuario.");
        setIsAdmin(false);
        return;
      }

      const userData = await response.json();
      console.log("✅ Usuario obtenido:", userData);

      setIsAdmin(userData.usuarioRole === "ROLE_ADMIN");
      console.log(
        "🔹 isAdmin actualizado a:",
        userData.usuarioRole === "ROLE_ADMIN"
      );
    } catch (error) {
      console.error("❌ Error al obtener el rol de usuario:", error.message);
      setIsAdmin(false);
    }
  };

  // **🔹 Llamamos a `fetchUserRole` cuando el usuario cambia**
  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

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
              {getInitials(user.nombre, user.apellido)}
            </div>
            <span className="text-[var(--color-default)]">{user.nombre}</span>
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
                  navigate("/panel-administrador");
                  setProfileMenuOpen(false);
                }}
              >
                <Settings size={20} />
                <span>Administrar</span>
              </button>
            )}

            <button
              className="flex items-center space-x-2 text-red-500 py-2"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>

      <Register isOpen={activeModal === "register"} onClose={closeModal} />
      <Login isOpen={activeModal === "login"} onClose={closeModal} />

      <button
        className="md:hidden"
        onClick={() => {
          setMenuOpen(!menuOpen);
          fetchUserRole();
        }}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-md rounded-md p-4 flex flex-col space-y-3 md:hidden w-48">
          {user ? (
            <>
              <div className="flex items-center space-x-3 border-b pb-2">
                <div className="h-12 w-12 rounded-full flex items-center text-2xl font-bold justify-center bg-gray-200">
                  {getInitials(user.nombre, user.apellido)}
                </div>
                <span className="text-[var(--color-default)] font-medium">
                  {user.nombre}
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
                <button
                  className="flex items-center space-x-2 py-2"
                  onClick={() => {
                    navigate("/panel-administrador");
                    setProfileMenuOpen(false);
                  }}
                >
                  <Settings size={20} />
                  <span>Administrar</span>
                </button>
              )}

              <button
                className="flex items-center space-x-2 text-red-500 py-2"
                onClick={handleLogout}
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
