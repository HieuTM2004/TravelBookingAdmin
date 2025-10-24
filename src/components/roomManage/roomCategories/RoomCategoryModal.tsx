// RoomCategoryModal.tsx - Advanced modal with chips for arrays
import React, { useState } from "react";
import { RoomCategoryCreateDto } from "../../../types/roomcategory.types";

interface RoomCategoryModalProps {
  show: boolean;
  editingId: string | null;
  formData: RoomCategoryCreateDto;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: RoomCategoryCreateDto) => void;
  selectedAccomName: string;
}

const RoomCategoryModal: React.FC<RoomCategoryModalProps> = ({
  show,
  editingId,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
  selectedAccomName,
}) => {
  const [tempBasic, setTempBasic] = useState("");
  const [tempRoom, setTempRoom] = useState("");
  const [tempBath, setTempBath] = useState("");

  if (!show) return null;

  type ArrayKey = "basicFacilities" | "roomFacilities" | "bathAmenities";

  const addToArray = (arrayKey: ArrayKey, tempValue: string) => {
    if (tempValue.trim()) {
      const updatedArray = [
        ...(formData[arrayKey] as string[]),
        tempValue.trim(),
      ];
      onFormDataChange({
        ...formData,
        [arrayKey]: updatedArray,
      });
      if (arrayKey === "basicFacilities") setTempBasic("");
      if (arrayKey === "roomFacilities") setTempRoom("");
      if (arrayKey === "bathAmenities") setTempBath("");
    }
  };

  const removeFromArray = (arrayKey: ArrayKey, index: number) => {
    const newArray = (formData[arrayKey] as string[]).filter(
      (_, i) => i !== index
    );
    onFormDataChange({ ...formData, [arrayKey]: newArray });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          {editingId ? "Edit Room Category" : "Add New Room Category"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Accommodation
            </label>
            <p className="text-sm font-medium text-gray-900 dark:text-white  px-3 py-2 dark:bg-gray-700  border border-gray-300 dark:border-gray-600 rounded-md">
              {selectedAccomName || "No accommodation selected"}
            </p>
            <input
              type="hidden"
              value={formData.accomId}
              // Pre-filled, no change needed
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g., Deluxe Sea View"
              value={formData.name}
              onChange={(e) =>
                onFormDataChange({ ...formData, name: e.target.value })
              }
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Arrays with chips */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Basic Facilities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g., Free Wi-Fi"
                value={tempBasic}
                onChange={(e) => setTempBasic(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && addToArray("basicFacilities", tempBasic)
                }
                className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addToArray("basicFacilities", tempBasic)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.basicFacilities.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full text-sm text-blue-800 dark:text-blue-200 flex items-center"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeFromArray("basicFacilities", index)}
                    className="ml-1 text-red-500 hover:text-red-700 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Similar for roomFacilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Room Facilities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g., Balcony with sea view"
                value={tempRoom}
                onChange={(e) => setTempRoom(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && addToArray("roomFacilities", tempRoom)
                }
                className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addToArray("roomFacilities", tempRoom)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.roomFacilities.map((item, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded-full text-sm text-indigo-800 dark:text-indigo-200 flex items-center"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeFromArray("roomFacilities", index)}
                    className="ml-1 text-red-500 hover:text-red-700 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Similar for bathAmenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bath Amenities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g., Walk-in shower"
                value={tempBath}
                onChange={(e) => setTempBath(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && addToArray("bathAmenities", tempBath)
                }
                className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addToArray("bathAmenities", tempBath)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.bathAmenities.map((item, index) => (
                <span
                  key={index}
                  className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-full text-sm text-purple-800 dark:text-purple-200 flex items-center"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeFromArray("bathAmenities", index)}
                    className="ml-1 text-red-500 hover:text-red-700 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              About
            </label>
            <textarea
              placeholder="Description (e.g., 32m², ban công hướng biển...)"
              value={formData.about}
              onChange={(e) =>
                onFormDataChange({ ...formData, about: e.target.value })
              }
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition-all hover:shadow-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomCategoryModal;
