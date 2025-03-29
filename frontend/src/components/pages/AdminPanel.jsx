import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITEMS_MENU_ADMIN } from "../../constants";
import { ToursTable } from "../organisms/ToursTable";
import { useTours } from "../../hooks/useTour";
import { UsersTable } from "../organisms/UsersTable";
import { TourEditForm } from "../organisms/TourEditForm"; // Corrección en el nombre del componente



export default function AdminPanel() {
  const [selected, setSelected] = useState("Usuarios");
  const [tourToEdit, setTourToEdit] = useState(null); // Estado para el tour en edición
  const navigate = useNavigate();
  const { tours } = useTours();

  return (
    <div className="px-6 py-24 mb-32">
      <header className="flex w-full p-6 gap-4 justify-between mt-[30px] flex-col-reverse items-start md:flex-row">
        <h1 className="font-bold uppercase text-3xl text-gray-500 text-center md:text-start">
          PANEL DEL ADMINISTRADOR
        </h1>
        <button
          className="flex items-center bg-transparent border-none justify-center gap-2 text-emphasis text-sm font-medium"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver atrás
        </button>
      </header>

      <div className="flex gap-6 my-8 flex-col md:flex-row">
        <div className="flex flex-col bg-white shadow-lg p-4 rounded-lg border border-gray-300 w-full md:w-[20%]">
          <h2 className="text-lg font-semibold text-center md:text-start md:mb-2 md:py-5 border-b border-gray-300">
            Menú
          </h2>
          <ul className="flex flex-row w-full gap-6 md:flex-col md:gap-0 md:space-y-2 text-center md:text-start">
            {ITEMS_MENU_ADMIN.map((item) => (
              <li
                key={item}
                className={`cursor-pointer px-3 py-1 w-[50%] md:w-full rounded ${
                  selected === item ? "text-black font-bold" : "text-gray-700"
                } hover:text-black`}
                onClick={() => {
                  setSelected(item);
                  setTourToEdit(null); // Ocultar el formulario si cambiamos de menú
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          {selected === "Usuarios" && <UsersTable />}
          {selected === "Tours" && !tourToEdit && (
            <ToursTable tours={tours} onEdit={(tour) => setTourToEdit(tour)} />
          )}

          {/* Mostrar Modal EditForm solo si hay un tour seleccionado */}
          {tourToEdit && <TourEditForm tour={tourToEdit} onClose={() => setTourToEdit(null)} />}
        </div>
      </div>
    </div>
  );

}
