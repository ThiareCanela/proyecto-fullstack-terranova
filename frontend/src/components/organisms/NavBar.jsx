import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-3">
        <img src={logo} alt="Terranova Logo" className="h-8 w-auto" />
        <span className="text-[var(--color-default)] font-bold text-lg">Terranova</span>
      </Link>

      {/* Botones de usuario en escritorio */}
      <div className="hidden md:flex space-x-4">
        <button className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-md">Crear cuenta</button>
        <button className="px-4 py-2 bg-[var(--color-emphasis)] text-white rounded-md">Iniciar sesión</button>
      </div>

      {/* Menú hamburguesa en mobile */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menú desplegable en mobile */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-md rounded-md p-4 flex flex-col space-y-3 md:hidden">
          <button className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-md">Crear cuenta</button>
          <button className="px-4 py-2 bg-[var(--color-emphasis)] text-white rounded-md">Iniciar sesión</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

