// AccommodationFacilitiesSection.tsx - Specific for Accommodation
import React from "react";
import type { Facility } from "../../types/accommodation.types";
import { removeFacility } from "../../api/accommodationAPI"; // Accommodation-specific

interface Props {
  facilities: Facility[];
  onAdd: () => void;
  accomId: string;
  onRefresh: () => void;
}

const AccommodationFacilitiesSection: React.FC<Props> = ({
  facilities,
  onAdd,
  accomId,
  onRefresh,
}) => {
  const handleRemove = async (facilityId: string) => {
    if (window.confirm("Are you sure you want to remove this facility?")) {
      try {
        await removeFacility(accomId, facilityId); // Accommodation API
        onRefresh();
      } catch (error) {
        console.error("Error removing facility:", error);
      }
    }
  };

  return (
    <section className="mb-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold">Facilities</h2>
        <button
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          Add
        </button>
      </div>
      {facilities.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No facilities assigned.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="text-center p-2 border rounded flex justify-between items-center"
            >
              <div>
                <span className="text-2xl mb-1">{getIcon(facility.icon)}</span>
                <p className="text-sm">{facility.name}</p>
              </div>
              <button
                onClick={() => handleRemove(facility.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// Simple icon mapper (unchanged)
const getIcon = (iconName: string) => {
  const icons: { [key: string]: string } = {
    wifi: "📶",
    dumbbell: "🏋️",
    pool: "🏊",
    parking: "🚗",
    washing: "🧺",
  };
  return icons[iconName] || "⚙️";
};

export default AccommodationFacilitiesSection;
