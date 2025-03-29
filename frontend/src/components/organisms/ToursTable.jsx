import { EditIcon, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { ModalTour } from "../molecules/ModalTour";
import { ModalTourUpdate } from "../molecules/ModalTourUpdate";
import { useTourById, useTours } from "../../hooks/useTour";
import { ModalConfirmDelete } from "../atoms/ModalConfirmDelete";

/* eslint-disable react/prop-types */
export const ToursTable = () => {
  const { tours, getDataTours, deleteTour } = useTours();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { oneTour, loading } = useTourById(selectedId); // Asegurar que hay estado de carga
  const [tourToDeleteName, setTourToDeleteName] = useState("");

  useEffect(() => {
    if (oneTour && !loading && !showModalDelete && selectedId) {
      setShowModalEdit(true);
    }
  }, [oneTour, loading, showModalDelete, selectedId]);
  
  
  const handleOpenModalEdit = (id) => {
    if (selectedId === id) {
      setSelectedId(null);
      setTimeout(() => {
        setSelectedId(id);
      }, 100);
    } else {
      setSelectedId(id);
    }

  };

  const handleCloseCreateModal = async () => {
    setShowModal(false);
    await getDataTours(); // 🔄 Recargar lista después de crear un nuevo tour
  };
  

  const handleOpenModalDelete = (id, name) => {
    if (!id) {
      console.error("Error: El ID del tour es inválido.");
      return;
    }
  
    console.log(`🗑️ Configurando eliminación para el tour ID: ${id}, Nombre: "${name}"`);
    setSelectedId(id); // ✅ Asignamos correctamente el ID
    setTourToDeleteName(name); // ✅ Guardamos el nombre
    setShowModalDelete(true); // ✅ Mostramos el modal de confirmación
  };
  
  
  
  const handleDeleteConfirmed = async () => {
    if (!selectedId) {
      console.error("Error: No hay un tour seleccionado para eliminar.");
      return;
    }
  
    try {
      console.log(`🗑️ Eliminando tour con ID: ${selectedId}`);
      await deleteTour(selectedId);
      setShowModalDelete(false);
      setSelectedId(null);
      await getDataTours(); //Recargar datos después de eliminar
    } catch (error) {
      console.error("Error eliminando el tour:", error);
    }
  };
  
  
  const handleCloseEditModal = async () => {
    setShowModalEdit(false);
    setSelectedId(null);
    await getDataTours(); // 🔄 Recargar lista después de editar
  };
  
  const handleCloseDeleteModal = () => {
    setShowModalDelete(false);
    setSelectedId(null); // 🔄 Evitar que el modal de edición se abra después
  };
  
    
  

  const handleOpenCreateTourModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="flex-1">
        <h3 className="w-full text-center font-semibold text-gray-500 text-2xl py-3">
          Administrar Tours
        </h3>
        <div className="flex justify-between mb-4">
          <button
            onClick={handleOpenCreateTourModal}
            className="flex font-bold cursor-pointer items-center bg-[var(--color-secondary)] px-4 py-2 rounded-2xl text-white shadow-lg hover:bg-white hover:text-black hover:border-black hover:border-2"
          >
            <Plus className="w-4 h-4 mr-2 font-bold" /> Crear
          </button>
        </div>

        <div className="bg-white rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-[var(--color-emphasis)] text-[var(--color-primary)]">
                <th className="py-2">ID</th>
                <th className="py-2">Tours</th>
                <th className="py-2">Categoría</th>
                <th className="py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {tours.length > 0 ? (
                tours.map((tour, index) => (
                  <tr key={`tour-${index}`} className="border-b">
                    <td className="py-2">{tour.id}</td>
                    <td className="py-2 flex items-center gap-2">{tour.titulo}</td>
                    <td className="py-2">
                      <span className="uppercase text-[12px]">
                        {tour.categoriaTours?.nombre || "Sin categoría"}
                      </span>
                    </td>
                    <td className="py-2 flex gap-3 w-full">
                      <EditIcon
                        width={20}
                        height={20}
                        className="hover:text-gray-500 cursor-pointer"
                        onClick={() => handleOpenModalEdit(tour.id)}
                      />
                      <Trash2
                        width={20}
                        height={20}
                        className="hover:text-gray-500 cursor-pointer"
                        onClick={() => handleOpenModalDelete(tour.id, tour.titulo)}
                      />

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Tours found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModalEdit && oneTour && (
        <ModalTourUpdate showModal={handleCloseEditModal} tour={oneTour} />
      )}
<<<<<<< HEAD
      {showModalDelete && (
        <ModalConfirmDelete
          showModal={() => setShowModalDelete(false)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
=======

{showModalDelete && (
  <ModalConfirmDelete 
    showModal={handleCloseDeleteModal} 
    onConfirm={handleDeleteConfirmed} 
    tourName={tourToDeleteName}
  />
)}


      {/* Verifica que el modal se renderiza */}
      {showModal && (
      <ModalTour showModal={handleCloseCreateModal} />
        )}
>>>>>>> bf66e9e (modificaciones adicionales para modificar tour y eliminar tour)
    </>
  );
};
