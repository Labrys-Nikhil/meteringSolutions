import React from "react";
import { Delete,XIcon } from "lucide-react";
const Modal = ({ isOpen, onClose, children,heading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100/30 backdrop-blur-sm px-2">
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col p-10">

        <div className="flex justify-between mb-4 ">
            <h2 className="heading-xl">{heading}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon color='red'className="w-8 h-8" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;