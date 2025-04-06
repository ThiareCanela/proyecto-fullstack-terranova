import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ReservationSummary } from "../organisms/ReservationSummary";

export const MisReservas = () => {
    const { user } = useAuth();
    const [reservas, setReservas] = useState([]);
    const [mostrarAntiguas, setMostrarAntiguas] = useState(false);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `http://localhost:8080/reservas/usuario/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setReservas(data);
            } catch (error) {
                console.error("Error al cargar reservas:", error);
            }
        };

        if (user?.id) {
            fetchReservas();
        }
    }, [user?.id]);

    const hoy = new Date();

    const reservasFiltradas = reservas
        .filter((r) => r.estado === "CONFIRMADA")
        .filter((r) => {
            const fechaFin = new Date(r.fechaFin);
            return mostrarAntiguas ? fechaFin < hoy : fechaFin >= hoy;
        })
        .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));

    return (
        <div className="p-4 sm:p-6 mt-24">

      <div className="flex justify-end mb-4">
        <button
          className="flex items-center bg-transparent border-none gap-2 text-[var(--color-emphasis)] text-sm font-medium"
          onClick={() => window.location.href = "/"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </button>
      </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-center text-[var(--color-default)] mb-6">
                {mostrarAntiguas ? "Reservas pasadas" : "Mis reservas vigentes"}
            </h1>

            <div className="flex justify-center mb-8">
                <button
                    className="bg-[var(--color-secondary)] text-white px-4 py-2 rounded-full hover:bg-[var(--color-emphasis)] transition-all"
                    onClick={() => setMostrarAntiguas((prev) => !prev)}
                >
                    {mostrarAntiguas ? "Ver vigentes" : "Ver pasadas"}
                </button>
            </div>

            {reservasFiltradas.length === 0 ? (
                <p className="text-center text-gray-500">
                    No tienes reservas {mostrarAntiguas ? "pasadas" : "vigentes"} registradas.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reservasFiltradas.map((reserva) => (
                        <div key={reserva.id} className="h-full flex">
                            <div className="w-full">
                                <ReservationSummary
                                    key={reserva.id}
                                    tour={reserva.tour}
                                    guests={reserva.numPersonas}
                                    startDate={reserva.fechaInicio}
                                    endDate={reserva.fechaFin}
                                    isCompact={true}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
