// RoomCategoriesSection.tsx
import React, { useState } from "react";
import type { RoomCategory } from "../../types/accommodation.types";
import RoomCategoryImagesGallery from "../roomManage/roomCategories/RoomCategoryImagesGallery";
import RoomCategoryFacilitiesSection from "../roomManage/roomCategories/RoomCategoryFacilitiesSection";

interface Props {
  roomCategories: RoomCategory[];
  onOpenAssign: (type: "image" | "facility", categoryId: string) => void; // Pass from parent for add
  onRefresh: () => void;
}

const RoomCategoriesSection: React.FC<Props> = ({
  roomCategories,
  onOpenAssign,
  onRefresh,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <section className="mb-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Room Categories</h2>
      <div className="space-y-4">
        {roomCategories.map((category) => (
          <div
            key={category.id}
            className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full p-4 text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center"
            >
              <span>
                {category.name} ({category.rooms.length} rooms)
              </span>
              <span>{expandedCategory === category.id ? "−" : "+"}</span>
            </button>
            {expandedCategory === category.id && (
              <div className="p-4 bg-white dark:bg-gray-800">
                <p className="mb-4">{category.about}</p>
                {category.images.length > 0 && (
                  <RoomCategoryImagesGallery
                    images={category.images}
                    onAdd={() => onOpenAssign("image", category.id)} // Pass category.id for add
                    categoryId={category.id}
                    onRefresh={onRefresh}
                  />
                )}
                {category.facilities.length > 0 && (
                  <RoomCategoryFacilitiesSection
                    facilities={category.facilities}
                    onAdd={() => onOpenAssign("facility", category.id)} // Pass category.id for add
                    categoryId={category.id} // For DELETE (room category)
                    onRefresh={onRefresh}
                  />
                )}
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Rooms</h3>
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="border px-2 py-1 text-left">
                          Room Name
                        </th>
                        <th className="border px-2 py-1 text-left">
                          Available
                        </th>
                        <th className="border px-2 py-1 text-left">
                          Breakfast
                        </th>
                        <th className="border px-2 py-1 text-left">Rating</th>
                        <th className="border px-2 py-1 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.rooms.map((room) => (
                        <tr
                          key={room.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="border px-2 py-1">{room.name}</td>
                          <td className="border px-2 py-1">
                            {room.available ? "Yes" : "No"}
                          </td>
                          <td className="border px-2 py-1">
                            {room.breakfast ? "Yes" : "No"}
                          </td>
                          <td className="border px-2 py-1">{room.rating}</td>
                          <td className="border px-2 py-1">
                            {(room.price ?? 0).toLocaleString("vi-VN")} VNĐ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomCategoriesSection;
