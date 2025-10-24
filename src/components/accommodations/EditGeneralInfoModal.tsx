// EditGeneralInfoModal.tsx - Modal for editing general info
import React, { useState } from "react";
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
    popularFacility: initialData.popularFacility || "",
    checkOut: initialData.checkOut || "",
    checkIn: initialData.checkIn || "",
    distanceToDowntown: initialData.distanceToDowntown || "",
    popularInArea: initialData.popularInArea || "",
    breakfastAvailability:
      initialData.breakfastAvailability !== undefined
        ? initialData.breakfastAvailability
        : true,
    availableRooms: initialData.availableRooms || 0,
    numberOfFloors: initialData.numberOfFloors || 0,
    anotherFacility: initialData.anotherFacility || "",
    nearbyPOI: initialData.nearbyPOI || "",
  });

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100000]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded max-w-lg w-full max-h-[80vh] overflow-y-auto text-gray-900 dark:text-white">
        <h2 className="text-xl mb-4">Edit General Info</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Popular Facility"
            value={formData.popularFacility}
            onChange={(e) => handleChange("popularFacility", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700"
            required
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
          <input
            placeholder="Distance to Downtown"
            value={formData.distanceToDowntown}
            onChange={(e) => handleChange("distanceToDowntown", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700"
            required
          />
          <input
            placeholder="Popular in Area"
            value={formData.popularInArea}
            onChange={(e) => handleChange("popularInArea", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700"
            required
          />
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={formData.breakfastAvailability}
              onChange={(e) =>
                handleChange("breakfastAvailability", e.target.checked)
              }
              className="mr-2"
            />
            Breakfast Availability
          </label>
          <input
            type="number"
            placeholder="Available Rooms"
            value={formData.availableRooms}
            onChange={(e) =>
              handleChange("availableRooms", parseInt(e.target.value))
            }
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700"
            required
          />
          <input
            type="number"
            placeholder="Number of Floors"
            value={formData.numberOfFloors}
            onChange={(e) =>
              handleChange("numberOfFloors", parseInt(e.target.value))
            }
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700"
            required
          />
          <input
            placeholder="Another Facility"
            value={formData.anotherFacility}
            onChange={(e) => handleChange("anotherFacility", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700"
            required
          />
          <textarea
            placeholder="Nearby POI"
            value={formData.nearbyPOI}
            onChange={(e) => handleChange("nearbyPOI", e.target.value)}
            className="w-full border px-3 py-2 mb-3 rounded dark:bg-gray-700 h-20"
            required
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

export default EditGeneralInfoModal;
