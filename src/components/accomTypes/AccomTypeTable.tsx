// AccomTypeTable.tsx - Table component for accom types
import React from "react";
import type { AccomTypeDto } from "../../types/accomtype.types";

interface AccomTypeTableProps {
  accomTypes: AccomTypeDto[];
  loading: boolean;
  onEdit: (accomType: AccomTypeDto) => void;
  onDelete: (id: string) => void;
}

const AccomTypeTable: React.FC<AccomTypeTableProps> = ({
  accomTypes,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-600 shadow-md">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Type
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Created At
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Modified At
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {accomTypes.map((accomType) => (
            <tr
              key={accomType.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {accomType.type}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {new Date(accomType.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {accomType.modifyAt
                  ? new Date(accomType.modifyAt).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                <button
                  onClick={() => onEdit(accomType)}
                  className="text-green-500 hover:text-green-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(accomType.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {accomTypes.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No accommodation types found.
        </div>
      )}
    </div>
  );
};

export default AccomTypeTable;
