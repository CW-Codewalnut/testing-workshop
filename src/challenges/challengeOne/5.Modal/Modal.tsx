import React, { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
  headerText: string;
  showActions?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  headerText,
  onConfirm,
  showActions = true,
}: ModalProps) {
  return isOpen ? (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-50">
      <div className="modal w-[300px] rounded-md bg-white p-6">
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-lg font-semibold">{headerText}</h2>
          <button onClick={onClose} type="button" title="close-modal-button">
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body text-black">{children}</div>
        {showActions && (
          <div className="flex justify-between pt-6">
            <button
              onClick={onClose}
              type="button"
              className="mr-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              type="button"
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
