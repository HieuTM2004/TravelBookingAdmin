// RoomCategoryAssignModal.tsx - Combined modal for image/facility assign (manual ID)
import React, { useState } from "react";

interface RoomCategoryAssignModalProps {
  show: boolean;
  type: "image" | "facility";
  onClose: () => void;
  onAssign: (id: string) => void;
}

const RoomCategoryAssignModal: React.FC<RoomCategoryAssignModalProps> = ({
  show,
  type,
  onClose,
  onAssign,
}) => {
  const [resourceId, setResourceId] = useState<string>("");

  const handleAssign = () => {
    if (resourceId.trim()) {
      onAssign(resourceId.trim());
      setResourceId("");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add {type === "image" ? "Image" : "Facility"} to Room Category
        </h2>
        <input
          type="text"
          placeholder={`Enter ${
            type === "image" ? "Image" : "Facility"
          } ID (e.g., 9999... for image)`}
          value={resourceId}
          onChange={(e) => setResourceId(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!resourceId.trim()}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md disabled:opacity-50 transition-colors"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCategoryAssignModal;
