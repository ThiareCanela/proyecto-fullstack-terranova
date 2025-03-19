import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITEMS_MENU_ADMIN } from "../../constants";
import { UsersTable } from "../organisms/usersTable";
import { ToursTable } from "../organisms/ToursTable";
import { useTours } from "../../hooks/useTour";

export default function AdminPanel() {
  const [selected, setSelected] = useState("Usuarios");
  const navigate = useNavigate();
  const { tours } = useTours();

  return (
    <div className="px-6 py-24 mb-32">
      <header className="flex w-full p-6 gap-4 justify-between mt-[30px] flex-col-reverse items-start md:flex-row ">
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
        <div className=" flex flex-col bg-white shadow-lg p-4 rounded-lg  border border-gray-300 w-full md:w-[20%]">
          <h2 className="text-lg font-semibold text-center md:text-start md:mb-2 md:py-5 border-b border-gray-300">
            Menú
          </h2>
          <ul className="flex flex-row  w-full gap-6 md:flex-col md:gap-0 md:space-y-2 text-center md:text-start">
            {ITEMS_MENU_ADMIN.map((item) => (
              <li
                key={item + 3}
                className={`cursor-pointer px-3 py-1 w-[50%] md:w-full rounded ${
                  selected === item ? "text-black font-bold" : "text-gray-700"
                } hover:text-black`}
                onClick={() => setSelected(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          {selected === "Usuarios" && <UsersTable />}
          {selected === "Tours" && <ToursTable tours={tours} />}
        </div>
      </div>
      {/* {showModal && (
        <div
          className="fixed inset-0 bg-[#9799aaa8] flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white py-8 px-6 rounded-lg shadow-lg relative flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <CircleAlert className="h-20 w-20 text-[#e67e24]" />
            <h3 className="text-3xl font-semibold py-3">Confirmar</h3>
            <p className="text-lg mb-4">
              {`¿Estás seguro de cambiar el rol de ${selectedUser?.name} a 
              ${selectedUser?.role}"?`}
            </p>

            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => confirmRoleChange(selectedUser?.role)}
              >
                Confirmar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
