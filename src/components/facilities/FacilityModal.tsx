import React from "react";
import type { FacilityCreateDto } from "../../types/facility.types";

interface FacilityModalProps {
  show: boolean;
  editingId: string | null;
  formData: FacilityCreateDto;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: FacilityCreateDto) => void;
}

const FacilityModal: React.FC<FacilityModalProps> = ({
  show,
  editingId,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
}) => {
  if (!show) return null;

  const handleInputChange = (field: keyof FacilityCreateDto, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingId ? "Edit Facility" : "Add New Facility"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g., Wi-Fi miễn phí"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon (name or code, e.g., wifi)
            </label>
            <input
              type="text"
              placeholder="e.g., wifi, pool, spa"
              value={formData.icon}
              onChange={(e) => handleInputChange("icon", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-sm transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacilityModal;
