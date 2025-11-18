import React from "react";
import type { CancelPolicyCreateDto } from "../../types/cancelpolicy.types";

interface CancelPolicyModalProps {
  show: boolean;
  editingId: string | null;
  formData: CancelPolicyCreateDto;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: CancelPolicyCreateDto) => void;
}

const CancelPolicyModal: React.FC<CancelPolicyModalProps> = ({
  show,
  editingId,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
}) => {
  if (!show) return null;

  const handleInputChange = (
    field: keyof CancelPolicyCreateDto,
    value: string
  ) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingId ? "Edit Cancel Policy" : "Add New Cancel Policy"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Policy Type
            </label>
            <input
              type="text"
              placeholder="e.g., Linh hoạt (24h), Non-Refundable"
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
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

export default CancelPolicyModal;
