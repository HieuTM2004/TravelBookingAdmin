import React from "react";
import { AccommodationSummary } from "../../types/accommodation.types";

interface AccommodationTableProps {
  accommodations: AccommodationSummary[];
  loading: boolean;
  onView: (id: string) => void;
  onEdit: (accom: AccommodationSummary) => void;
  onDelete: (id: string) => void;
}

const AccommodationTable: React.FC<AccommodationTableProps> = ({
  accommodations,
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <p className="text-gray-900 dark:text-white">Loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              ID
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Name
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Type ID
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Star
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Rating
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Location
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Price
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {accommodations.map((accom) => (
            <tr
              key={accom.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {accom.id}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {accom.name}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {accom.accomTypeId}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {accom.star}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {accom.rating}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {accom.location}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                ${accom.price}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                <button
                  onClick={() => onView(accom.id)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(accom)}
                  className="text-green-500 hover:text-green-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(accom.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccommodationTable;
