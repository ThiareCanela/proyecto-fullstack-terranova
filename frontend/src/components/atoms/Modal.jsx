import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity z-50">
      <div className="bg-white p-6 rounded-lg relative w-full max-w-md mx-auto shadow-lg">
        <button
          className="absolute top-2 right-2 text-[var(--color-default)] hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
