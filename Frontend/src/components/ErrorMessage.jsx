import React, { useState } from 'react';

function ErrorMessage({ message, onClose }) {
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-96 bg-red-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center">
            <div className="flex grow items-center">
                <p>{message}</p>
            </div>
            <button
                className="ml-4 p-2 bg-transparent text-white border-none rounded-full hover:bg-red-700"
                onClick={onClose}
            >
                X
            </button>
        </div>
    );
}

export default ErrorMessage;
