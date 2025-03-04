import { ArrowLeft, ArrowUpDown, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  { id: "01", name: "Maria_v", role: "User" },
  { id: "02", name: "Maria_v", role: "Adm" },
  { id: "03", name: "Maria_v", role: "Adm" },
  { id: "04", name: "Maria_v", role: "Adm" },
];
export default function AdminPanel() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  return (
    <div className="px-6 mb-8">
      <header className="flex w-full p-6 gap-4 justify-between mt-[80px] flex-col-reverse items-start md:flex-row ">
        <h1 className="font-bold uppercase text-3xl text-gray-500">
          PANEL DEL ADMINISTRADOR{" "}
        </h1>
        <button
          className="flex items-center bg-transparent border-none justify-center gap-2 text-emphasis text-sm font-medium"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver atrás{" "}
        </button>
      </header>
      <div className="flex gap-6 my-8">
        {/* Sidebar */}
        <div className="bg-white shadow-lg p-4 rounded-lg w-64">
          <h2 className="text-lg font-semibold mb-2">Menu</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer text-gray-700 hover:text-black">
              Usuarios
            </li>
            <li className="cursor-pointer text-gray-700 hover:text-black">
              Categorías
            </li>
          </ul>
        </div>

        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <button className="flex items-center bg-gray-200 px-4 py-2 rounded-lg text-gray-700">
              <ArrowUpDown className="w-4 h-4 mr-2" /> Ordenar
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search ..."
                className="border px-4 py-2 rounded-lg w-48 pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Id</th>
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Rol</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2">{user.id}</td>
                    <td className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src="src/assets/profile.webp"
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        {user.name}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        {user.role}
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
