export default function ConfirmModal({ show, onCancel, onConfirm }) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg text-white w-80">
          <h2 className="text-lg font-semibold mb-4">Confirm Changes</h2>
          <p className="mb-4 text-sm text-gray-300">
            Are you sure you want to save these changes?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
  