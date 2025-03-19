import React from "react";
import { TourForm } from "../organisms/TourForm";
/* eslint-disable react/prop-types */
export const ModalTourUpdate = ({ showModal, tour }) => (
  <div
    className="fixed inset-0 bg-[#9799aaa8] flex justify-center items-start pt-20 overflow-y-auto md:top-12"
    // onClick={() => setShowModal(false)}
    onClick={showModal}
  >
    <div
      className="bg-white pt-10 px-6 py-4 rounded-lg shadow-lg relative flex flex-col items-center justify-start w-[90%]  md:w-[700px]  md:h-[80%] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        // onClick={() => setShowModal(false)}
        onClick={showModal}
      >
        ✖
      </button>
      <div className="w-full overflow-y-auto flex-1">
        <TourForm action="Editar" tour={tour} />
      </div>
    </div>
  </div>
);
