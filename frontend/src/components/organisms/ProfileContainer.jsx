/* eslint-disable react/prop-types */
export const ProfileContainer = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col items-start  md:max-w-[500px]">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar ? user.avatar : "https://terranova-tours-images.s3.us-east-1.amazonaws.com/profile.webp"}
          alt="User Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 w-full">
        <div className="flex justify-between border-b border-gray-300 py-5">
          <span className="text-gray-600">Nombre</span>
          <span>{user.name}</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 py-5">
          <span className="text-gray-600">Apellido</span>
          <span>{user.lastName}</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 py-5">
          <span className="text-gray-600">Email</span>
          <span>{user.email}</span>
        </div>
      </div>
      
    </div>
  );
};
