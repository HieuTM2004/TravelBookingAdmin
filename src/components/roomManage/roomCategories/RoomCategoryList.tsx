// RoomCategoryList.tsx - Complete and fixed card-based layout with expandable details
import React, { useState } from "react";
import type { RoomCategoryDto } from "../../../types/roomcategory.types";
import RoomCategoryFacilitiesSection from "./RoomCategoryFacilitiesSection";
import RoomCategoryImagesGallery from "./RoomCategoryImagesGallery";
import { AccommodationSummary } from "../../../types/accommodation.types";

interface RoomCategoryListProps {
  roomCategories: RoomCategoryDto[];
  loading: boolean;
  onEdit: (roomCategory: RoomCategoryDto) => void;
  onDelete: (id: string) => void;
  onOpenAssign: (type: "image" | "facility", categoryId: string) => void;
  onRefresh?: () => void;
  accommodations?: AccommodationSummary[];
}

const RoomCategoryList: React.FC<RoomCategoryListProps> = ({
  roomCategories,
  loading,
  onEdit,
  onDelete,
  onOpenAssign,
  onRefresh,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="grid place-items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleRefresh = () => {
    onRefresh?.();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      {roomCategories.map((category) => (
        <div
          key={category.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {category.about}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(category)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 px-3 py-1 rounded-md text-sm transition-colors bg-blue-100 dark:bg-blue-900/30"
                >
                  Edit
                </button>
                <button
                  onClick={() => onOpenAssign("image", category.id)}
                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 px-3 py-1 rounded-md text-sm transition-colors bg-green-100 dark:bg-green-900/30"
                >
                  Add Image
                </button>
                <button
                  onClick={() => onOpenAssign("facility", category.id)}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 px-3 py-1 rounded-md text-sm transition-colors bg-indigo-100 dark:bg-indigo-900/30"
                >
                  Add Facility
                </button>
                <button
                  onClick={() => onDelete(category.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded-md text-sm transition-colors bg-red-100 dark:bg-red-900/30"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
              <span>Category: {category.name}</span>
              <span>
                Created: {new Date(category.createdAt).toLocaleDateString()}
              </span>
              {category.modifyAt && (
                <span>
                  Modified: {new Date(category.modifyAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {/* Expandable Details */}
          <div className="p-0">
            <button
              onClick={() =>
                setExpandedId(expandedId === category.id ? null : category.id)
              }
              className="w-full px-6 py-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {expandedId === category.id ? "Hide Details" : "Show Details"} ▼
            </button>
            {expandedId === category.id && (
              <div className="p-6 space-y-6">
                {/* Facilities */}
                {category.facilities && category.facilities.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Facilities
                    </h4>
                    <RoomCategoryFacilitiesSection
                      facilities={category.facilities}
                      onAdd={() => onOpenAssign("facility", category.id)}
                      categoryId={category.id}
                      onRefresh={handleRefresh}
                    />
                  </div>
                )}

                {/* Images */}
                {category.images && category.images.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Images
                    </h4>
                    <RoomCategoryImagesGallery
                      images={category.images}
                      onAdd={() => onOpenAssign("image", category.id)}
                      categoryId={category.id}
                      onRefresh={handleRefresh}
                    />
                  </div>
                )}

                {/* Rooms Table */}
                {category.rooms && category.rooms.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Rooms ({category.rooms.length})
                    </h4>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                      <table className="w-full min-w-max">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">
                              Room Name
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">
                              Available
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">
                              Breakfast
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">
                              Rating
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {category.rooms.map((room) => (
                            <tr
                              key={room.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                {room.name}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                {room.available ? (
                                  <span className="text-green-600">Yes</span>
                                ) : (
                                  <span className="text-red-600">No</span>
                                )}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                {room.breakfast ? (
                                  <span className="text-green-600">Yes</span>
                                ) : (
                                  <span className="text-red-600">No</span>
                                )}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                {room.rating}
                              </td>
                              <td className="px-4 py-2 text-sm font-medium text-right text-gray-900 dark:text-gray-100">
                                ${room.price.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Basic/Room/Bath Facilities Lists */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Basic Facilities
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {category.basicFacilities.length > 0 ? (
                        category.basicFacilities.map((fac, i) => (
                          <li key={i}>&bull; {fac}</li>
                        ))
                      ) : (
                        <li className="italic">None</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Room Facilities
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {category.roomFacilities.length > 0 ? (
                        category.roomFacilities.map((fac, i) => (
                          <li key={i}>&bull; {fac}</li>
                        ))
                      ) : (
                        <li className="italic">None</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Bath Amenities
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {category.bathAmenities.length > 0 ? (
                        category.bathAmenities.map((fac, i) => (
                          <li key={i}>&bull; {fac}</li>
                        ))
                      ) : (
                        <li className="italic">None</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      {roomCategories.length === 0 && !loading && (
        <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-lg mb-2">No room categories found.</p>
          <p className="text-sm">Select an accommodation to view categories.</p>
        </div>
      )}
    </div>
  );
};

export default RoomCategoryList;
