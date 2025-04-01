import { ArrowUpDown, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; 

export const UsersTable = () => {
  const { user, listarUsuarios, cambiarRolUsuario } = useAuth(); // 🔹 Obtener usuario autenticado
  
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 🔹 Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      const usuarios = await listarUsuarios();
      console.log("Usuarios cargados:", usuarios);
      setUsers(usuarios);
    };

    fetchUsers();
  }, []);

  // 🔹 Filtrar usuarios por búsqueda
  const filteredUsers = users.filter(
    (u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) || 
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Seleccionar usuario y abrir modal (evita seleccionar al usuario actual)
  const handleRoleChange = (userToModify, role) => {
    if (userToModify.id === user.id) {
      console.warn("⚠️ No puedes cambiar tu propio rol."); // 🔹 Mensaje en consola para debugging
      return; // 🔹 Evita abrir el modal si el usuario intenta cambiar su propio rol
    }

    console.log(`🔹 Usuario seleccionado para cambio de rol:`, userToModify);
    setSelectedUser(userToModify);
    setNewRole(role);
    setShowModal(true);
  };

  // 🔹 Confirmar cambio de rol
  const confirmRoleChange = async () => {
    if (!selectedUser) return;

    console.log(`⚡ Confirmando cambio de rol para ID: ${selectedUser.id} a ${newRole}`);

    const response = await cambiarRolUsuario(selectedUser.id);

    if (response.success) {
      // 🔹 Recargar lista de usuarios después del cambio de rol
      const updatedUsers = await listarUsuarios();
      console.log("Lista de usuarios después del cambio:", updatedUsers);
      setUsers(updatedUsers);
    }

    setSelectedUser(null);
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
                filteredUsers.map((usuario, index) => (
                  <tr key={usuario.id} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 flex items-center gap-2">
                      <img
                        src={usuario.profilePicture || "src/assets/profile.webp"}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      {usuario.nombre} {usuario.apellido}
                    </td>
                    <td className="py-2">
                      <select
                        className={`border-none rounded-lg p-1 ${
                          usuario.usuarioRole === "ROLE_ADMIN" ? "bg-blue-100" : "bg-transparent"
                        }`}
                        value={usuario.usuarioRole} 
                        disabled={usuario.id === user.id} // 🔹 Bloquear el select si el usuario es el mismo
                        onChange={(e) => handleRoleChange(usuario, e.target.value)}
                      >
                        <option value="ROLE_USER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
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

      {/* Modal de Confirmación */}
      {showModal && selectedUser && (
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
              {`¿Estás seguro de cambiar el rol de ${selectedUser.nombre} a 
              ${newRole === "ROLE_ADMIN" ? "Administrador" : "Usuario"}?`}
            </p>

            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={confirmRoleChange}
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
