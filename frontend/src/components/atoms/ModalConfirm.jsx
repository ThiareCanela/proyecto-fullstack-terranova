import { CheckCircle } from "lucide-react";
/* eslint-disable react/prop-types */
export const ModalConfirm = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
        <CheckCircle className="mx-auto text-green-500 w-12 h-12" />
        <p className="mt-4 text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};
