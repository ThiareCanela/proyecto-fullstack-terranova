import { EditIcon, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
// import { TourForm } from "./TourForm";
import { ModalTour } from "../molecules/ModalTour";

import { ModalTourUpdate } from "../molecules/ModalTourUpdate";
import { useTourById } from "../../hooks/useTour";

/* eslint-disable react/prop-types */
export const ToursTable = ({ tours }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { oneTour } = useTourById(selectedId);

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  const handleOpenModalEdit = (id) => {
    setSelectedId(id);
    setShowModalEdit(true);
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
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar tours..."
              className=" px-4 py-2 rounded-full w-48 pl-10 bg-white  shadow-lg"
              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
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
    </>
  );
};
