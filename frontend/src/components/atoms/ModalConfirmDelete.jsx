/* eslint-disable react/prop-types */
export const ModalConfirmDelete = ({ showModal, onConfirm, tourName }) => {
  return (
    <div
      className="fixed inset-0 bg-[#9799aaa8] flex justify-center items-center"
      onClick={showModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800">
          ¿Estás seguro de que deseas eliminar este tour?
        </h2>
        <p className="text-gray-600 my-4">
          Esta acción no se puede deshacer.
        </p>
        {/*Mostrar el nombre del tour aquí */}
        {tourName && (
          <p className="text-gray-800 font-semibold my-2">
            Tour: <span className="text-red-600">"{tourName}"</span>
          </p>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="bg-blue-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={showModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
