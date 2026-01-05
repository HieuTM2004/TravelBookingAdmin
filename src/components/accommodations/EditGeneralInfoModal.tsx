import React, { useState, useEffect } from "react";
import type { GeneralInfoUpdateDto } from "../../types/accommodation.types";

interface Props {
  show: boolean;
  initialData: Partial<GeneralInfoUpdateDto>;
  onClose: () => void;
  onSave: (data: GeneralInfoUpdateDto) => void;
}

const EditGeneralInfoModal: React.FC<Props> = ({
  show,
  initialData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<GeneralInfoUpdateDto>({
    popularFacility: "",
    checkOut: "",
    checkIn: "",
    distanceToDowntown: "",
    popularInArea: "",
    breakfastAvailability: true,
    availableRooms: 0,
    numberOfFloors: 0,
    anotherFacility: "",
    nearbyPOI: "",
  });

  // Sync internal state when modal opens with new data
  useEffect(() => {
    if (show) {
      setFormData({
        popularFacility: initialData.popularFacility || "",
        checkOut: initialData.checkOut || "",
        checkIn: initialData.checkIn || "",
        distanceToDowntown: initialData.distanceToDowntown || "",
        popularInArea: initialData.popularInArea || "",
        breakfastAvailability: initialData.breakfastAvailability ?? true,
        availableRooms: initialData.availableRooms || 0,
        numberOfFloors: initialData.numberOfFloors || 0,
        anotherFacility: initialData.anotherFacility || "",
        nearbyPOI: initialData.nearbyPOI || "",
      });
    }
  }, [show, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (
    field: keyof GeneralInfoUpdateDto,
    value: string | boolean | number
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  if (!show) return null;

  const labelClass =
    "block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider";
  const inputClass =
    "w-full border px-3 py-2 rounded-lg outline-none transition-all \
                      bg-white border-gray-200 text-gray-800 \
                      dark:bg-gray-900 dark:border-gray-700 dark:text-white \
                      focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100000] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Edit General Information
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Update the detailed specifications for this accommodation.
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Popular Facility */}
            <div className="md:col-span-2">
              <label className={labelClass}>Main Popular Facilities</label>
              <input
                placeholder="e.g. Free WiFi, Swimming Pool"
                value={formData.popularFacility}
                onChange={(e) =>
                  handleChange("popularFacility", e.target.value)
                }
                className={inputClass}
                required
              />
            </div>

            {/* Check-in / Check-out */}
            <div>
              <label className={labelClass}>Check-in Time</label>
              <input
                type="text"
                placeholder="e.g. 14:00"
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
                placeholder="e.g. 12:00"
                value={formData.checkOut}
                onChange={(e) => handleChange("checkOut", e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* Distance / Area */}
            <div>
              <label className={labelClass}>Distance to Downtown</label>
              <input
                placeholder="e.g. 2.5 km"
                value={formData.distanceToDowntown}
                onChange={(e) =>
                  handleChange("distanceToDowntown", e.target.value)
                }
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Popular in Area</label>
              <input
                placeholder="e.g. Hiking, Local Markets"
                value={formData.popularInArea}
                onChange={(e) => handleChange("popularInArea", e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* Rooms / Floors */}
            <div>
              <label className={labelClass}>Available Rooms</label>
              <input
                type="number"
                value={formData.availableRooms}
                onChange={(e) =>
                  handleChange("availableRooms", parseInt(e.target.value) || 0)
                }
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Total Floors</label>
              <input
                type="number"
                value={formData.numberOfFloors}
                onChange={(e) =>
                  handleChange("numberOfFloors", parseInt(e.target.value) || 0)
                }
                className={inputClass}
                required
              />
            </div>

            {/* Another Facility */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Additional Services / Facilities
              </label>
              <input
                placeholder="e.g. Laundry Service, Airport Shuttle"
                value={formData.anotherFacility}
                onChange={(e) =>
                  handleChange("anotherFacility", e.target.value)
                }
                className={inputClass}
                required
              />
            </div>

            {/* POI */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Nearby Points of Interest (POI)
              </label>
              <textarea
                placeholder="List nearby attractions..."
                value={formData.nearbyPOI}
                onChange={(e) => handleChange("nearbyPOI", e.target.value)}
                className={`${inputClass} h-24 resize-none`}
                required
              />
            </div>

            {/* Breakfast Checkbox */}
            <div className="md:col-span-2 flex items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <input
                id="breakfast"
                type="checkbox"
                checked={formData.breakfastAvailability}
                onChange={(e) =>
                  handleChange("breakfastAvailability", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="breakfast"
                className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Is Breakfast Available?
              </label>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-900/20">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
          >
            Save Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGeneralInfoModal;
