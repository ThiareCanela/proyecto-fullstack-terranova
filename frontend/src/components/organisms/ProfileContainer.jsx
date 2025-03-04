/* eslint-disable react/prop-types */
export const ProfileContainer = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
        {/* <FaRegEdi className="text-gray-400 cursor-pointer" /> */}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Nombre</span>
          <span>{user.name}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Apellido</span>
          <span>{user.lastName}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Email</span>
          <span>{user.email}</span>
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
        Editar
      </button>
    </div>
  );
};
