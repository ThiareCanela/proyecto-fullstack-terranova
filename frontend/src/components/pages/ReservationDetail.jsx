import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  User,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { CARACTERISTICAS } from "../../constants";
import { CharacteristicsSection } from "../molecules/CharacteristicsSection";
import Modal from "../atoms/Modal"; // Importamos el modal

export default function ReservationDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const startDate = location.state?.startDate || "";
  const endDate = location.state?.endDate || "";
  const guests = location.state?.guests || 1;
  const pricePerDay = 50; // Precio por día

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startD = new Date(start);
    const endD = new Date(end);
    return Math.max(1, Math.ceil((endD - startD) / (1000 * 60 * 60 * 24)));
  };
  const totalDays = calculateDays(startDate, endDate);
  const totalPrice = totalDays * pricePerDay;

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [modal, setModal] = useState({ isOpen: false, success: false });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contact.firstName && contact.lastName && contact.email.includes("@")) {
      setModal({ isOpen: true, success: true });
    } else {
      setModal({ isOpen: true, success: false });
    }
  };

  return (
    <div className="flex flex-col bg-[var(--color-primary)] min-h-screen p-25">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-default)]">
          Detalle de la reserva
        </h1>
        <button
          className="flex items-center text-[var(--color-emphasis)] gap-2 font-medium"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver atrás
        </button>
      </header>

      {/* Contenido Principal */}
      <main className="flex flex-col md:flex-row gap-20 flex-grow">
        {/* Tarjeta de Reserva (Izquierda) */}
        <section className="md:w-5/12 bg-white shadow-lg rounded-2xl p-6 border border-[var(--color-secondary)]">
          {/* Imágenes */}
          <div className="w-full mb-4">
            <img
              className="w-full object-cover h-64 md:h-80 rounded-lg"
              src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/b/r/brasil35.jpg"
              alt="Retiro en el Amazonas"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <img
                className="w-full object-cover h-32 md:h-40 rounded-lg"
                src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/bzngtenckauetvefmdai"
                alt="Imagen adicional"
              />
              <img
                className="w-full object-cover h-32 md:h-40 rounded-lg"
                src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/vs0bb8a9jx5w7bteecsj"
                alt="Imagen adicional"
              />
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-[var(--color-default)]">
              Retiro en el Amazonas
            </h2>
            <div className="flex items-center text-gray-600 gap-2">
              <MapPin className="w-5 h-5 text-[var(--color-emphasis)]" />
              <span>Brasil</span>
            </div>
          </div>

          <div className="text-gray-700 space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--color-emphasis)]" />
              <span>
                <strong>{guests}</strong> personas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-emphasis)]" />
              <span>
                {startDate
                  ? new Date(startDate).toLocaleDateString()
                  : "No seleccionada"}{" "}
                -{" "}
                {endDate
                  ? new Date(endDate).toLocaleDateString()
                  : "No seleccionada"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--color-emphasis)]" />
              <span>{totalDays} días</span>
            </div>
          </div>

          <div className="mt-4">
            <CharacteristicsSection characteristics={CARACTERISTICAS} />
          </div>

          <hr className="my-4 border-t border-gray-300" />

          <div className="flex justify-between items-center text-lg font-semibold text-[var(--color-default)]">
            <span>Precio total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </section>

        {/* Formulario de Contacto (Derecha) */}
        <section className="md:w-7/12 bg-white shadow-lg rounded-2xl p-6 border border-[var(--color-secondary)] h-full">
          <h2 className="text-lg font-bold mb-4 text-[var(--color-default)]">
            Datos del contacto
          </h2>

          <form
            className="flex flex-col h-full space-y-4 flex-grow"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={contact.firstName}
                onChange={handleChange}
                placeholder="Nombre"
                className="border p-2 rounded-lg text-sm w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                value={contact.lastName}
                onChange={handleChange}
                placeholder="Apellido"
                className="border p-2 rounded-lg text-sm w-full"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              className="border p-2 rounded-lg text-sm w-full"
              required
            />
            <button
              type="submit"
              className="bg-[var(--color-emphasis)] text-white font-medium text-sm px-6 py-3 rounded-xl w-full hover:scale-105"
            >
              Reservar
            </button>
          </form>
        </section>
      </main>

      {/* Modal */}
      <Modal isOpen={modal.isOpen} onClose={() => setModal({ isOpen: false })}>
        {modal.success ? (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-center text-lg font-bold text-[var(--color-default)] mb-2">
              Reserva exitosa
            </h2>
            <div className="text-left text-gray-700 space-y-2">
              <p className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[var(--color-emphasis)]" />
                <span>Brasil</span>
              </p>
              <p className="text-lg font-bold text-[var(--color-default)]">
                Retiro en el Amazonas
              </p>
              <p className="flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--color-emphasis)]" />
                {guests} personas
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--color-emphasis)]" />
                {startDate
                  ? new Date(startDate).toLocaleDateString()
                  : "No seleccionada"}{" "}
                -{" "}
                {endDate
                  ? new Date(endDate).toLocaleDateString()
                  : "No seleccionada"}
              </p>
            </div>
            <p className="text-center font-medium text-[var(--color-default)] mt-4">
              Tu reserva se realizó con éxito
            </p>
          </>
        ) : (
          <>
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
            <p className="text-center font-bold">Error en la reserva</p>
            <p className="text-center font-medium text-[var(--color-default)] mt-4">
              Hubo un problema al procesar la reserva. Intenta nuevamente más
              tarde.
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}
