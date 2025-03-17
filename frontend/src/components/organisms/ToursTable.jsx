import { EditIcon, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { TourForm } from "./TourForm";

/* eslint-disable react/prop-types */
export const ToursTable = ({ tours }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex-1">
        <h3 className="w-full text-center font-semibold text-gray-500 text-2xl py-3">
          Administrar Tours
        </h3>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="flex font-bold cursor-pointer items-center bg-[var(--color-default)] px-4 py-2 rounded-2xl text-white shadow-lg hover:bg-white hover:text-black hover:border-black hover:border-2"
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
              <tr className="border-b">
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
                    {/* <td className="py-2">{index + 1}</td> */}
                    <td className="py-2">{tour.id}</td>
                    <td className="py-2 flex items-center gap-2">
                      {tour.name}
                    </td>
                    <td className="py-2">
                      <span className=" uppercase text-[10px] font-bold rounded-2xl bg-amber-200 w-auto p-1 px-2">
                        {tour.category}
                      </span>
                    </td>
                    <td className="py-2 flex  gap-3 w-full">
                      <EditIcon
                        width={20}
                        height={20}
                        className="hover:text-gray-500 cursor-pointer"
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
      {showModal && (
        <div
          className="fixed inset-0 bg-[#9799aaa8] flex justify-center items-start pt-20 overflow-y-auto md:top-12"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white pt-10 px-6 py-4 rounded-lg shadow-lg relative flex flex-col items-center justify-start w-[90%]  md:w-[700px]  md:h-[80%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <div className="w-full overflow-y-auto flex-1">
              <TourForm action={"Nuevo"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
