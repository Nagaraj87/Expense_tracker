import React from 'react';

function Toast({ message, onClose }) {
  return (
    <div
      className="fixed top-0 right-0 m-4 flex items-center px-4 py-3 rounded-md bg-green-500 text-white shadow-md z-50"
      role="alert"
    >
      <div className="mr-2">
       
      </div>
      <p className="font-medium">{message}</p>
      <button type="button" className="ml-auto focus:outline-none" onClick={onClose}>
        
      </button>
    </div>
  );
}

export default Toast;
