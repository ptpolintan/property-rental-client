import React from 'react';

type ModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  isLoading?: boolean;
  onConfirm?: () => void;
  onClose: () => void;
};

export default function Modal({
  isOpen,
  title,
  message,
  isLoading,
  onConfirm,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-4">{message}</p>

        {isLoading && <p className="mt-4 text-blue-500">Loading...</p>}

        <div className="mt-6 flex justify-end gap-2">
          {!isLoading && (
            <>
              {onConfirm && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
              )}
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={onClose}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}