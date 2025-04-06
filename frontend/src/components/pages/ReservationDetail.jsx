import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ModalConfirmReservation } from "../molecules/ModalConfirmReservation";
import { ReservationSummary } from "../organisms/ReservationSummary";
import { useAuth } from "../../context/AuthContext";
import { postCreateReservation } from "../../apis/booking";

export default function ReservationDetail() {
  const [modal, setModal] = useState({
    isOpen: false,
    success: false,
    message: "",
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const tour = location.state?.tour || {};
  const startDate = location.state?.startDate || "";
  const endDate = location.state?.endDate || "";
  const guests = location.state?.guests || 1;
  const { user } = useAuth();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const formatDateToYYYYMMDD = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const requestData = {
  tourId: tour.id,
  estado: "CONFIRMADA",
  fechaFin: formatDateToYYYYMMDD(endDate),
  fechaInicio: formatDateToYYYYMMDD(startDate),
  numPersonas: guests,
  total: guests * tour.precio,
  usuarioId: user.id,
    tourId: tour.id,
    estado: "CONFIRMADA",
    fechaFin: endDate,
    fechaInicio: startDate,
    numPersonas: guests,
    total: guests * tour.precio,
    usuarioId: user.id,
  };
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await postCreateReservation(requestData);
    setModal({ isOpen: true, success: true, message: "Reserva confirmada con éxito" });
    console.log(response, "response");
  } catch (error) {
    console.error("Error al crear reserva:", error.message);
    setModal({
      isOpen: true,
      success: false,
      message: error.message || "Ocurrió un error inesperado",
    });
  }
};

  

  return (
    <>
      <div className="flex flex-col bg-[var(--color-primary)] min-h-screen py-25 px-6 md:px-10">
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

        <main className="flex flex-col md:flex-row gap-10 md:justify-between flex-grow">
          <ReservationSummary
            tour={tour}
            guests={guests}
            startDate={startDate}
            endDate={endDate}
          />

          <section className="md:w-7/12 bg-white shadow-lg rounded-2xl p-6 border md:max-w-[500px] border-[var(--color-secondary)] h-full">
            <h2 className="text-lg font-bold mb-4 text-[var(--color-default)]">
              Datos del contacto
            </h2>

            <form
              className="flex flex-col h-full space-y-4 flex-grow"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-default)]">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="border border-gray-300 p-2 rounded-lg w-full bg-blue-100"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-default)]">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                    className="border border-gray-300 p-2 rounded-lg w-full bg-blue-100"
                    required
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-default)]">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  className="border border-gray-300 p-2 rounded-lg w-full bg-blue-100"
                  required
                  disabled
                />
              </div>

              <button
                type="submit"
                className="bg-[var(--color-emphasis)] text-white font-medium text-sm px-6 py-3 rounded-xl w-full hover:scale-105"
              >
                Reservar
              </button>
            </form>
          </section>
        </main>
      </div>
      <ModalConfirmReservation
        modal={modal}
        setModal={setModal}
        tour={tour}
        endDate={endDate}
        startDate={startDate}
        guests={guests}
      />
    </>
  );
}
