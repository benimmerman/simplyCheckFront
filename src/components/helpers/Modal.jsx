import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // If the modal isn't open, return null (no rendering)

  return (
    <>
      {/* Overlay */}
      <div
        className=" fixed inset-0 backdrop-blur z-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white relative rounded-lg shadow-xl sm:min-w-[500px] sm:min-h-[500px] overflow-y-auto p-6">
          {/* Modal Header */}
          <div className="p-6 flex border-b border-gray-200 text-2xl justify-between items-center mb-4">
            <h2 className=" font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
