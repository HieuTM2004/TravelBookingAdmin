// EditPolicyModal.tsx - Similar modal for policy (abbreviated for brevity, expand fields as needed)
import React, { useState } from "react";
import type { PolicyUpdateDto } from "../../types/accommodation.types";

interface Props {
  show: boolean;
  initialData: Partial<PolicyUpdateDto>;
  onClose: () => void;
  onSave: (data: PolicyUpdateDto) => void;
}

const EditPolicyModal: React.FC<Props> = ({
  show,
  initialData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<PolicyUpdateDto>({
    instruction: initialData.instruction || "",
    requiredDocs: initialData.requiredDocs || "",
    checkIn: initialData.checkIn || "",
    checkOut: initialData.checkOut || "",
    breakfast: initialData.breakfast || "",
    smoking: initialData.smoking || "",
    pets: initialData.pets || "",
    additional: initialData.additional || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof PolicyUpdateDto, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded max-w-lg w-full max-h-[80vh] overflow-y-auto text-gray-900 dark:text-white">
        <h2 className="text-xl mb-4">Edit Policy</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Instructions"
            value={formData.instruction || ""}
            onChange={(e) => handleChange("instruction", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700 h-20"
          />
          <textarea
            placeholder="Required Docs"
            value={formData.requiredDocs || ""}
            onChange={(e) => handleChange("requiredDocs", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700 h-20"
          />
          <input
            placeholder="Check-in Time"
            value={formData.checkIn}
            onChange={(e) => handleChange("checkIn", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700"
            required
          />
          <input
            placeholder="Check-out Time"
            value={formData.checkOut}
            onChange={(e) => handleChange("checkOut", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700"
            required
          />
          <textarea
            placeholder="Breakfast"
            value={formData.breakfast}
            onChange={(e) => handleChange("breakfast", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700 h-20"
            required
          />
          <textarea
            placeholder="Smoking Policy"
            value={formData.smoking}
            onChange={(e) => handleChange("smoking", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700 h-20"
            required
          />
          <textarea
            placeholder="Pets Policy"
            value={formData.pets}
            onChange={(e) => handleChange("pets", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700 h-20"
            required
          />
          <textarea
            placeholder="Additional"
            value={formData.additional || ""}
            onChange={(e) => handleChange("additional", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700 h-20"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPolicyModal;
