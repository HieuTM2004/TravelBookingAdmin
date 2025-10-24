// GeneralInfoSection.tsx - Updated with null checks to prevent crashes
import React from "react";
import type { GeneralInfo } from "../../types/accommodation.types";

interface Props {
  generalInfo: GeneralInfo | null; // Allow null
  onEdit: () => void;
  onDelete: () => void;
}

const GeneralInfoSection: React.FC<Props> = ({
  generalInfo,
  onEdit,
  onDelete,
}) => {
  if (!generalInfo) {
    return (
      <section className="mb-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 relative">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold">General Information</h2>
          <button
            onClick={onEdit}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm mr-2"
          >
            Add
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          No general information available.
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold">General Information</h2>
        <div className="space-x-2">
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Check-in:</strong> {generalInfo.checkIn || "N/A"}
          </p>
          <p>
            <strong>Check-out:</strong> {generalInfo.checkOut || "N/A"}
          </p>
          <p>
            <strong>Breakfast:</strong>{" "}
            {generalInfo.breakfastAvailability ? "Included" : "Not included"}
          </p>
          <p>
            <strong>Available Rooms:</strong> {generalInfo.availableRooms}
          </p>
          <p>
            <strong>Floors:</strong> {generalInfo.numberOfFloors}
          </p>
        </div>
        <div>
          <p>
            <strong>Distance to Downtown:</strong>{" "}
            {generalInfo.distanceToDowntown || "N/A"}
          </p>
          <p>
            <strong>Popular in Area:</strong>{" "}
            {generalInfo.popularInArea || "N/A"}
          </p>
          <p>
            <strong>Popular Facilities:</strong>{" "}
            {generalInfo.popularFacility || "N/A"}
          </p>
          <p>
            <strong>Other Facilities:</strong>{" "}
            {generalInfo.anotherFacility || "N/A"}
          </p>
          <p>
            <strong>Nearby POI:</strong> {generalInfo.nearbyPOI || "N/A"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default GeneralInfoSection;
