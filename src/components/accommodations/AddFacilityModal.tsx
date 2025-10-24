import React, { useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  onAssign: (facilityId: string) => void;
}

const AddFacilityModal: React.FC<Props> = ({ show, onClose, onAssign }) => {
  const [facilityId, setFacilityId] = useState<string>("");

  const handleAssign = () => {
    if (facilityId) {
      onAssign(facilityId);
      setFacilityId(""); // Reset
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded max-w-md w-full">
        <h2 className="text-xl mb-4">Add Facility</h2>
        <input
          type="text"
          placeholder="Enter Facility ID (e.g., aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01)"
          value={facilityId}
          onChange={(e) => setFacilityId(e.target.value)}
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
            disabled={!facilityId}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFacilityModal;
