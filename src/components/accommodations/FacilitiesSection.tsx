import React from "react";
import type { Facility } from "../../types/accommodation.types";
import { removeFacility } from "../../api/accommodationAPI";
import DynamicIcon from "../common/DynamicIcon";

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
        await removeFacility(accomId, facilityId);
        onRefresh();
      } catch (error) {
        console.error("Error removing facility:", error);
      }
    }
  };

  return (
    <section className="mb-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 relative">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Facilities
        </h2>
        <button
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          + Add
        </button>
      </div>

      {facilities.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 italic">
          No facilities assigned to this accommodation.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="group relative flex flex-col items-center p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-all"
            >
              <div className="mb-2">
                <DynamicIcon
                  iconName={facility.icon}
                  size={28}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <p className="text-xs font-medium text-gray-700 dark:text-gray-200 text-center line-clamp-2">
                {facility.name}
              </p>

              {/* Nút Remove xuất hiện khi hover vào card */}
              <button
                onClick={() => handleRemove(facility.id)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                title="Remove facility"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AccommodationFacilitiesSection;
