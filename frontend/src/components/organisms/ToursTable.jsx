import { EditIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ModalTour } from "../molecules/ModalTour";

import { ModalTourUpdate } from "../molecules/ModalTourUpdate";
import { useTourById, useTours } from "../../hooks/useTour";
import { ModalConfirmDelete } from "../atoms/ModalConfirmDelete";

/* eslint-disable react/prop-types */
export const ToursTable = ({ tours }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { oneTour } = useTourById(selectedId);
  const { deleteTour, getDataTours } = useTours();

  const handleOpenModalEdit = (id) => {
    setSelectedId(id);
    console.log("Tour seleccionado:", id);
    setShowModalEdit(true);
  };
  console.log("oneTour:", oneTour);
  const handleOpenModalDelete = (id) => {
    setSelectedId(id);
    setShowModalDelete(true);
  };

  const handleDeleteConfirmed = async () => {
    await deleteTour(selectedId);
    setShowModalDelete(false);
    getDataTours();
  };

  return (
    <>
      <div className="flex-1">
        <h3 className="w-full text-center font-semibold text-gray-500 text-2xl py-3">
          Administrar Tours
        </h3>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setShowModal(true)}
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
                <th className="py-2">Categoria</th>
                <th className="py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {tours.length > 0 ? (
                tours.map((tour, index) => (
                  <tr key={`tour-${index}`} className="border-b">
                    <td className="py-2">{tour.id}</td>
                    <td className="py-2 flex items-center gap-2">
                      {tour.titulo}
                    </td>
                    <td className="py-2">
                      <span className=" uppercase text-[12px]  ">
                        {tour.categoriaTours.nombre}
                      </span>
                    </td>
                    <td className="py-2 flex  gap-3 w-full">
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
                        onClick={() => handleOpenModalDelete(tour.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No Tours found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <ModalTour showModal={() => setShowModal(false)} />}
      {showModalEdit && (
        <ModalTourUpdate
          showModal={() => setShowModalEdit(false)}
          tour={oneTour}
        />
      )}
      {showModalDelete && (
        <ModalConfirmDelete
          showModal={() => setShowModalDelete(false)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </>
  );
};
