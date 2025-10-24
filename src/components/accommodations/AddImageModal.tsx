// AddImageModal.tsx
import React, { useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  onAssign: (imageId: string) => void;
}

const AddImageModal: React.FC<Props> = ({ show, onClose, onAssign }) => {
  const [imageId, setImageId] = useState<string>("");

  const handleAssign = () => {
    if (imageId) {
      onAssign(imageId);
      setImageId(""); // Reset
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded max-w-md w-full">
        <h2 className="text-xl mb-4">Add Image</h2>
        <input
          type="text"
          placeholder="Enter Image ID (e.g., 99999999-0000-0000-0000-000000000001)"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!imageId}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddImageModal;
