// RoomTable.tsx - Added View button in actions
import React from "react";
import { RoomSummary } from "../../../types/room.types";

interface RoomTableProps {
  rooms: RoomSummary[];
  loading: boolean;
  onEdit: (room: RoomSummary) => void;
  onDelete: (id: string) => void;
  onView?: (id: string) => void; // Optional for view
}

const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
  loading,
  onEdit,
  onDelete,
  onView = () => {}, // Default no-op
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
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Name
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Available
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Breakfast
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Rating
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Price
            </th>

            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Bed Type
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr
              key={room.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {room.name}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    room.available
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {room.available ? "Yes" : "No"}
                </span>
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    room.breakfast
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {room.breakfast ? "Yes" : "No"}
                </span>
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {"★".repeat(Math.floor(room.rating))} {room.rating}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {(room.price ?? 0).toLocaleString("vi-VN")} VNĐ
              </td>

              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {room.bedTypeName || "N/A"}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                <button
                  onClick={() => onView(room.id)} // Use onView prop
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 px-3 py-1 rounded-md text-xs transition-colors bg-indigo-100 dark:bg-indigo-900/30"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(room)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 px-3 py-1 rounded-md text-xs transition-colors bg-blue-100 dark:bg-blue-900/30"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(room.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded-md text-xs transition-colors bg-red-100 dark:bg-red-900/30"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rooms.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">No rooms found.</p>
          <p className="text-sm">Select a category to view rooms.</p>
        </div>
      )}
    </div>
  );
};

export default RoomTable;
