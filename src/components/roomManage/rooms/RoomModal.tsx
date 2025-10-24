// RoomModal.tsx - Updated for exact fields (numberOfBeds, cancelPolicyId, etc.)
import React, { useState } from "react";
import { RoomCreateDto } from "../../../types/room.types";
import { RoomCategoryDto } from "../../../types/roomcategory.types";

interface RoomModalProps {
  show: boolean;
  editingId: string | null;
  formData: RoomCreateDto;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: RoomCreateDto) => void;
  categories: RoomCategoryDto[];
}

const RoomModal: React.FC<RoomModalProps> = ({
  show,
  editingId,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
  categories,
}) => {
  const [tempRating, setTempRating] = useState(formData.rating);

  if (!show) return null;

  const handleChange = (
    field: keyof RoomCreateDto,
    value: string | boolean | number
  ) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
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
                {tempRating}
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
              Category
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bed Type ID
            </label>
            <input
              type="text"
              placeholder="e.g., eeeeeeee-eeee-eeee-eeee-eeeeeeeeee05"
              value={formData.bedTypeId}
              onChange={(e) => handleChange("bedTypeId", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cancel Policy ID
            </label>
            <input
              type="text"
              placeholder="e.g., f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1"
              value={formData.cancelPolicyId}
              onChange={(e) => handleChange("cancelPolicyId", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default RoomModal;
