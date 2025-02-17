import { Mail, Phone } from "lucide-react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--color-primary)]">
      {/* Línea divisoria superior */}
      <hr className="border-t-2 border-gray-300 my-6 w-11/12 mx-auto" />

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo y frase */}
        <div className="text-left">
          <img src={logo} alt="Terranova Logo" className="h-12 w-auto mb-2" />
          <h2 className="text-[var(--color-default)] text-lg font-bold">Terranova</h2>
          <p className="text-[var(--color-default)]">Explora el mundo, una experiencia a la vez.</p>
        </div>

        {/* Contacto */}
        <div className="text-left md:text-right">
          <h2 className="text-[var(--color-default)] text-lg font-bold">Contáctanos</h2>
          <div className="mt-2 flex items-center md:justify-end">
            <Mail className="text-[var(--color-emphasis)] mr-2" />
            <span className="text-[var(--color-default)]">contacto@terranova.com</span>
          </div>
          <div className="mt-2 flex items-center md:justify-end">
            <Phone className="text-[var(--color-emphasis)] mr-2" />
            <span className="text-[var(--color-default)]">+51 999 999 999</span>
          </div>
        </div>
      </div>

      {/* Línea divisoria inferior */}
      <hr className="border-t-2 border-gray-300 my-4 w-11/12 mx-auto" />

      {/* Copyright centrado */}
      <p className="text-center text-[var(--color-default)] text-sm pb-4">
        © 2025 Terranova. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;

