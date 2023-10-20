import React, { useEffect } from 'react';

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }
  }, [open]);

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
