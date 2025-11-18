// RoomCategoryAssignModal.tsx - Updated with combobox (select) for images/facilities by name, ID internal
import React, { useState, useEffect } from "react";
import { FacilityDto } from "../../../types/facility.types";
import { ImageDto } from "../../../types/image.types";
import { getImages } from "../../../api/imageAPI";
import { getFacilities } from "../../../api/facilityAPI";

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
  const [availableItems, setAvailableItems] = useState<
    (ImageDto | FacilityDto)[]
  >([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchAvailableItems();
    } else {
      setAvailableItems([]);
      setSelectedId("");
    }
  }, [show, type]);

  const fetchAvailableItems = async () => {
    setLoading(true);
    try {
      if (type === "image") {
        const data = await getImages();
        setAvailableItems(data);
      } else {
        const data = await getFacilities();
        setAvailableItems(data);
      }
    } catch (error) {
      console.error(`Error fetching ${type}s:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = () => {
    if (selectedId) {
      onAssign(selectedId);
      setSelectedId(""); // Reset
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add {type === "image" ? "Image" : "Facility"} to Room Category
        </h2>
        <div className="relative">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">
              Select {type === "image" ? "Image" : "Facility"}
            </option>
            {availableItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name || item.alt || `ID: ${item.id.substring(0, 8)}...`}{" "}
              </option>
            ))}
          </select>
          {loading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
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

export default RoomCategoryAssignModal;
