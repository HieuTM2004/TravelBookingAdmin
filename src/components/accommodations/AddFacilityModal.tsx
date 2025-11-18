// AddFacilityModal.tsx - Updated with combobox for facilities
import React, { useState, useEffect } from "react";
import { getFacilities } from "../../api/facilityAPI"; // Import for facilities
import type { FacilityDto } from "../../types/facility.types";
import { assignFacility } from "../../api/accommodationAPI";

interface AddFacilityModalProps {
  show: boolean;
  accomId: string; // Pass accomId for POST
  onClose: () => void;
  // onAssign: (facilityId: string) => void;
  onRefresh: () => void; // Callback to refresh parent
}

const AddFacilityModal: React.FC<AddFacilityModalProps> = ({
  show,
  accomId,
  onClose,
  onRefresh,
}) => {
  const [availableFacilities, setAvailableFacilities] = useState<FacilityDto[]>(
    []
  );
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchAvailableFacilities();
    } else {
      setAvailableFacilities([]);
      setSelectedId("");
    }
  }, [show]);

  const fetchAvailableFacilities = async () => {
    setLoading(true);
    try {
      const data = await getFacilities();
      setAvailableFacilities(data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (selectedId) {
      try {
        await assignFacility(accomId, selectedId); // POST to /Accommodation/{accomId}/facilities/{id}
        onRefresh(); // Refresh parent
        onClose(); // Close modal
      } catch (error) {
        console.error("Error assigning facility:", error);
        // Optional: Alert
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add Facility to Accommodation
        </h2>
        <div className="relative">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Select Facility</option>
            {availableFacilities.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedId}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md disabled:opacity-50 transition-colors"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFacilityModal;
