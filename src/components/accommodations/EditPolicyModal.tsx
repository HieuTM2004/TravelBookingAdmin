import React, { useState, useEffect } from "react";
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
    instruction: "",
    requiredDocs: "",
    checkIn: "",
    checkOut: "",
    breakfast: "",
    smoking: "",
    pets: "",
    additional: "",
  });

  useEffect(() => {
    if (show) {
      setFormData({
        instruction: initialData.instruction || "",
        requiredDocs: initialData.requiredDocs || "",
        checkIn: initialData.checkIn || "",
        checkOut: initialData.checkOut || "",
        breakfast: initialData.breakfast || "",
        smoking: initialData.smoking || "",
        pets: initialData.pets || "",
        additional: initialData.additional || "",
      });
    }
  }, [show, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof PolicyUpdateDto, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (!show) return null;

  const labelClass =
    "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider";
  const inputClass =
    "w-full border px-3 py-2 rounded-lg outline-none transition-all \
                      bg-white border-gray-200 text-gray-800 \
                      dark:bg-gray-900 dark:border-gray-700 dark:text-white \
                      focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500";
  const textareaClass = `${inputClass} min-h-[80px] resize-none`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100000] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Edit Accommodation Policy
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Define the rules, check-in procedures, and guest requirements.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Arrival Instructions */}
            <div className="md:col-span-2">
              <label className={labelClass}>Check-in Instructions</label>
              <textarea
                placeholder="How should guests check in? (e.g., Meet at front desk, digital key code...)"
                value={formData.instruction}
                onChange={(e) => handleChange("instruction", e.target.value)}
                className={textareaClass}
              />
            </div>

            {/* Required Documents */}
            <div className="md:col-span-2">
              <label className={labelClass}>Required Documents</label>
              <textarea
                placeholder="e.g., Passport or National ID required for all guests upon arrival."
                value={formData.requiredDocs}
                onChange={(e) => handleChange("requiredDocs", e.target.value)}
                className={textareaClass}
              />
            </div>

            {/* Check-in / Check-out Times */}
            <div>
              <label className={labelClass}>Check-in Time</label>
              <input
                type="text"
                placeholder="e.g., 14:00 - 22:00"
                value={formData.checkIn}
                onChange={(e) => handleChange("checkIn", e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Check-out Time</label>
              <input
                type="text"
                placeholder="e.g., Before 12:00"
                value={formData.checkOut}
                onChange={(e) => handleChange("checkOut", e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* Specific Policies */}
            <div className="md:col-span-2">
              <label className={labelClass}>Breakfast Policy</label>
              <textarea
                placeholder="Specify if breakfast is included, served at what time, or available for a fee."
                value={formData.breakfast}
                onChange={(e) => handleChange("breakfast", e.target.value)}
                className={textareaClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Smoking Policy</label>
              <textarea
                placeholder="Is smoking allowed? (e.g., Outdoors only, No smoking in rooms...)"
                value={formData.smoking}
                onChange={(e) => handleChange("smoking", e.target.value)}
                className={textareaClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Pets Policy</label>
              <textarea
                placeholder="Are pets allowed? Any weight limits or extra cleaning fees?"
                value={formData.pets}
                onChange={(e) => handleChange("pets", e.target.value)}
                className={textareaClass}
                required
              />
            </div>

            {/* Additional Info */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Additional Terms & Conditions
              </label>
              <textarea
                placeholder="Any other rules (e.g., Quiet hours, Pool usage, Visitor policy...)"
                value={formData.additional}
                onChange={(e) => handleChange("additional", e.target.value)}
                className={textareaClass}
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-900/20">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            Update Policies
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPolicyModal;
