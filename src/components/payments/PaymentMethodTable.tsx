import React from "react";
import type { PaymentMethodDto } from "../../types/paymentmethod.types";

interface PaymentMethodTableProps {
  paymentMethods: PaymentMethodDto[];
  loading: boolean;
  onEdit: (paymentMethod: PaymentMethodDto) => void;
  onDelete: (id: string) => void;
}

const PaymentMethodTable: React.FC<PaymentMethodTableProps> = ({
  paymentMethods,
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
              ID
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Name
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((method) => (
            <tr
              key={method.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                  {method.id.substring(0, 8)}...
                </div>
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {method.name}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(method)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 px-3 py-1 rounded-md text-xs transition-colors bg-blue-100 dark:bg-blue-900/30"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(method.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded-md text-xs transition-colors bg-red-100 dark:bg-red-900/30"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {paymentMethods.length === 0 && !loading && (
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
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2zm0 0l3 3m0 0l3-3m-3 3v10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          <p className="text-lg mb-2">No payment methods yet</p>
          <p className="text-sm">Add your first method to get started.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodTable;
