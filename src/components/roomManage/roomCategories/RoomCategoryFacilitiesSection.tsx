// RoomCategoryFacilitiesSection.tsx
import React, { useState } from "react";
import { removeFacilityFromRoomCategory } from "../../../api/roomcategoryAPI";
import { Facility } from "../../../types/accommodation.types";
import AddFacilityToRoomCategoryModal from "./AddFacilityToRoomCategoryModal";
import DynamicIcon from "../../common/DynamicIcon";
// 1. Import DynamicIcon của bạn vào đây

interface Props {
  facilities: Facility[];
  onAdd: () => void;
  categoryId: string;
  onRefresh: () => void;
}

const RoomCategoryFacilitiesSection: React.FC<Props> = ({
  facilities,
  onAdd,
  categoryId,
  onRefresh,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleOpenAdd = () => {
    onAdd();
    setShowAddModal(true);
  };

  const handleRemove = async (facilityId: string) => {
    if (window.confirm("Are you sure you want to remove this facility?")) {
      try {
        await removeFacilityFromRoomCategory(categoryId, facilityId);
        onRefresh();
      } catch (error) {
        console.error("Error removing facility:", error);
      }
    }
  };

  return (
    <>
      <section className="mb-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 relative">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Facilities
          </h2>
          <button
            onClick={handleOpenAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            + Add Facility
          </button>
        </div>

        {facilities.length === 0 ? (
          <div className="text-center py-6 text-gray-500 italic">
            No facilities assigned to this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="group relative flex flex-col items-center p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all"
              >
                <DynamicIcon
                  iconName={facility.icon}
                  size={32}
                  className="mb-2 text-blue-500 dark:text-blue-400"
                />

                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 text-center line-clamp-1">
                  {facility.name}
                </p>

                {/* Nút xóa được làm gọn lại cho đẹp */}
                <button
                  onClick={() => handleRemove(facility.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                  title="Remove"
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

      <AddFacilityToRoomCategoryModal
        show={showAddModal}
        categoryId={categoryId}
        onClose={() => setShowAddModal(false)}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default RoomCategoryFacilitiesSection;
