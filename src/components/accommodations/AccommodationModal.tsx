// AccommodationModal.tsx - Updated for AccomUpdateDto with correct fields (email, phone, description; no price for update)
import React, { useState, useEffect } from "react";
import type { AccomUpdateDto } from "../../types/accommodation.types"; // Assume AccomType { id: string, name: string }
import { getAccomTypes } from "../../api/accomtypeAPI";
import { AccomTypeDto } from "../../types/accomtype.types";

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
  const [accomTypes, setAccomTypes] = useState<AccomTypeDto[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);

  useEffect(() => {
    if (show) {
      fetchAccomTypes();
    }
  }, [show]);

  const fetchAccomTypes = async () => {
    setLoadingTypes(true);
    try {
      const types = await getAccomTypes(); // Assume returns AccomType[]
      setAccomTypes(types);
    } catch (error) {
      console.error("Error fetching accommodation types:", error);
    } finally {
      setLoadingTypes(false);
    }
  };

  const handleInputChange = (
    field: keyof AccomUpdateDto,
    value: string | number
  ) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000] p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full max-h-[95vh] overflow-y-auto text-gray-900 dark:text-white shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {editingId ? "Edit Accommodation" : "Add New Accommodation"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Accommodation Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Sunrise Hotel"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g., info@sunrisehotel.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g., 09123456789"
              value={formData.phone}
              onChange={(e) => {
                let value = e.target.value;

                // CHỈ cho phép số, +, -, khoảng trắng
                value = value.replace(/[^0-9+\-\s]/g, "");

                // LẤY RIÊNG CÁC SỐ ĐỂ GIỚI HẠN 11
                const digitsOnly = value.replace(/\D/g, ""); // chỉ giữ số

                if (digitsOnly.length > 11) return; // nếu vượt 11 số thì không update nữa

                handleInputChange("phone", value);
              }}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Accom Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Accommodation Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.accomTypeId}
              onChange={(e) => handleInputChange("accomTypeId", e.target.value)}
              disabled={loadingTypes}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              required
            >
              <option value="">Select Type</option>
              {accomTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
            {loadingTypes && (
              <p className="text-xs text-blue-500 mt-1">Loading types...</p>
            )}
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Star Rating <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.star}
              onChange={(e) =>
                handleInputChange("star", parseInt(e.target.value))
              }
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <option key={s} value={s}>
                  {s} Star{s > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Describe the accommodation..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 123 Main St, Downtown"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., New York City"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Google Maps Query */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Google Maps Query <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Sunrise Hotel, New York"
              value={formData.ggMapsQuery}
              onChange={(e) => handleInputChange("ggMapsQuery", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Lat,Long */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Latitude, Longitude <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 40.7128,-74.0060"
              value={formData.ll}
              onChange={(e) => handleInputChange("ll", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccommodationModal;
