// RoomModal.tsx - Updated for exact fields (numberOfBeds, cancelPolicyId, etc.)
import React, { useEffect, useState } from "react";
import { RoomCreateDto } from "../../../types/room.types";
import { RoomCategoryDto } from "../../../types/roomcategory.types";
import { BedTypeDto } from "../../../types/bedtype.types";
import { CancelPolicyDto } from "../../../types/cancelpolicy.types";

interface RoomModalProps {
  show: boolean;
  editingId: string | null;
  formData: RoomCreateDto;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: RoomCreateDto) => void;
  categories: RoomCategoryDto[];
  bedTypes: BedTypeDto[];
  cancelPolicies: CancelPolicyDto[];
  selectedCategoryName: string;
}

const RoomModal: React.FC<RoomModalProps> = ({
  show,
  editingId,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
  bedTypes,
  cancelPolicies,
  selectedCategoryName,
}) => {
  const [tempRating, setTempRating] = useState(formData.rating);

  useEffect(() => {
    setTempRating(formData.rating);
  }, [formData.rating]);
  console.log("rating" + formData.rating);
  if (!show) return null;

  const handleChange = (
    field: keyof RoomCreateDto,
    value: string | boolean | number
  ) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          {editingId ? "Edit Room" : "Add New Room"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Room Name
            </label>
            <input
              type="text"
              placeholder="e.g., B-201"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <p className="text-sm font-medium text-gray-900 dark:text-white px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
              {selectedCategoryName || "No category selected"}
            </p>
            <input
              type="hidden"
              value={formData.categoryId}
              // Pre-filled from parent, no change
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Number of Beds
              </label>
              <input
                type="number"
                min="1"
                value={formData.numberOfBeds}
                onChange={(e) =>
                  handleChange("numberOfBeds", parseInt(e.target.value))
                }
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value) || 0)
                }
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rating (0-10)
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={tempRating}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setTempRating(val);
                  handleChange("rating", val);
                }}
                className="w-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 block mt-1">
                {tempRating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Available
              </label>
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => handleChange("available", e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Breakfast Included
              </label>
              <input
                type="checkbox"
                checked={formData.breakfast}
                onChange={(e) => handleChange("breakfast", e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bed Type
            </label>
            <select
              value={formData.bedTypeId}
              onChange={(e) => handleChange("bedTypeId", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Bed Type</option>
              {bedTypes.map((bedType) => (
                <option key={bedType.id} value={bedType.id}>
                  {bedType.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cancel Policy ID
            </label>
            <select
              value={formData.cancelPolicyId}
              onChange={(e) => handleChange("cancelPolicyId", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Cancel Policy</option>
              {cancelPolicies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  {policy.type}
                </option>
              ))}
            </select>
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

export default RoomModal;
