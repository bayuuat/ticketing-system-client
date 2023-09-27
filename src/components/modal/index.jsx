import React, { Children } from 'react';

const Modal = ({open, onClose, children}) => {
  return (
    open && (
      <div className="fixed flex justify-center items-center inset-0 z-50 overflow-hidden">
        <div onClick={onClose} className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 dark:bg-navy-700 opacity-75"></div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full dark:bg-navy-800">
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
