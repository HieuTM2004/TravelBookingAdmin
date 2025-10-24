// AccommodationModal.tsx - Updated for AccomUpdateDto with correct fields (email, phone, description; no price for update)
import React from "react";
import type { AccomUpdateDto } from "../../types/accommodation.types";

interface AccommodationModalProps {
  show: boolean;
  editingId: string | null;
  formData: AccomUpdateDto;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: AccomUpdateDto) => void;
}

const AccommodationModal: React.FC<AccommodationModalProps> = ({
  show,
  editingId,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
}) => {
  if (!show) return null;

  const handleInputChange = (
    field: keyof AccomUpdateDto,
    value: string | number
  ) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded max-w-md w-full max-h-[95vh] overflow-y-auto text-gray-900 dark:text-white">
        <h2 className="text-xl mb-4 text-gray-900 dark:text-white">
          {editingId ? "Edit" : "Add New"}
        </h2>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            placeholder="Accom Type ID"
            value={formData.accomTypeId}
            onChange={(e) => handleInputChange("accomTypeId", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={formData.star}
            onChange={(e) =>
              handleInputChange("star", parseInt(e.target.value))
            }
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <option key={s} value={s}>
                {s} Star
              </option>
            ))}
          </select>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            required
          />
          <input
            placeholder="Address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            placeholder="Google Maps Query"
            value={formData.ggMapsQuery}
            onChange={(e) => handleInputChange("ggMapsQuery", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            placeholder="Lat,Long"
            value={formData.ll}
            onChange={(e) => handleInputChange("ll", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccommodationModal;
