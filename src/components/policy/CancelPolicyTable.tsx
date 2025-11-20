import React from "react";
import type { CancelPolicyDto } from "../../types/cancelpolicy.types";

interface CancelPolicyTableProps {
  cancelPolicies: CancelPolicyDto[];
  loading: boolean;
  onEdit: (cancelPolicy: CancelPolicyDto) => void;
  onDelete: (id: string) => void;
}

const CancelPolicyTable: React.FC<CancelPolicyTableProps> = ({
  cancelPolicies,
  loading,
  onEdit,
  onDelete,
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
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
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
          {cancelPolicies.map((policy) => (
            <tr
              key={policy.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {policy.type}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {new Date(policy.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {policy.modifyAt
                  ? new Date(policy.modifyAt).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(policy)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 px-3 py-1 rounded-md text-xs transition-colors bg-blue-100 dark:bg-blue-900/30"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(policy.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded-md text-xs transition-colors bg-red-100 dark:bg-red-900/30"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cancelPolicies.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg mb-2">No cancel policies yet</p>
          <p className="text-sm">Add your first policy to get started.</p>
        </div>
      )}
    </div>
  );
};

export default CancelPolicyTable;
