// RoomCategoryTable.tsx - Modern table with expandable rows for facilities/images
import React from "react";
import { RoomCategoryDto } from "../../../types/roomcategory.types";

interface RoomCategoryTableProps {
  roomCategories: RoomCategoryDto[];
  loading: boolean;
  onEdit: (roomCategory: RoomCategoryDto) => void;
  onDelete: (id: string) => void;
  onOpenAssign: (type: "image" | "facility") => void;
}

const RoomCategoryTable: React.FC<RoomCategoryTableProps> = ({
  roomCategories,
  loading,
  onEdit,
  onDelete,
  onOpenAssign,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 shadow-md">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              About
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Accom ID
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {roomCategories.map((roomCategory) => (
            <tr
              key={roomCategory.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {roomCategory.id.substring(0, 8)}...
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {roomCategory.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                {roomCategory.about}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {roomCategory.accomId.substring(0, 8)}...
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(roomCategory)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 px-3 py-1 rounded transition-colors bg-blue-100 dark:bg-blue-900/30"
                >
                  Edit
                </button>
                <button
                  onClick={() => onOpenAssign("image")}
                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 px-3 py-1 rounded transition-colors bg-green-100 dark:bg-green-900/30"
                >
                  Add Image
                </button>
                <button
                  onClick={() => onOpenAssign("facility")}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 px-3 py-1 rounded transition-colors bg-indigo-100 dark:bg-indigo-900/30"
                >
                  Add Facility
                </button>
                <button
                  onClick={() => onDelete(roomCategory.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded transition-colors bg-red-100 dark:bg-red-900/30"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {roomCategories.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">No room categories found.</p>
          <p className="text-sm">Select an accommodation to view categories.</p>
        </div>
      )}
    </div>
  );
};

export default RoomCategoryTable;
