import { ArrowUpDown, CircleAlert, Search } from "lucide-react";
import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";

export const UsersTable = () => {
  //   const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const confirmRoleChange = (newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === selectedUser.id ? { ...u, role: newRole } : u
      )
    );
    localStorage.setItem(
      "users",
      JSON.stringify(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, role: newRole } : u
        )
      )
    );
    setShowModal(false);
  };

  return (
    <>
      <div className="flex-1">
        <h3 className="w-full text-center font-semibold text-gray-500 text-2xl py-3">
          Administrar usuarios
        </h3>
        <div className="flex justify-between mb-4">
          <button className="hidden md:flex items-center bg-white px-4 py-2 rounded-full text-gray-700 shadow-lg">
            <ArrowUpDown className="w-4 h-4 mr-2" /> Ordenar
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar usuario..."
              className=" px-4 py-2 rounded-full w-48 pl-10 bg-white  shadow-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">ID</th>
                <th className="py-2">Nombre</th>
                <th className="py-2">Rol</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 flex items-center gap-2">
                      <img
                        src={user.profilePicture || "src/assets/profile.webp"}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      {user.name} {user.lastName}
                    </td>
                    <td className="py-2">
                      <select
                        className="border rounded-lg p-1"
                        defaultValue={user.role.toLowerCase()}
                        onChange={(e) =>
                          handleRoleChange({ ...user, role: e.target.value })
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
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
      )}
    </>
  );
};
