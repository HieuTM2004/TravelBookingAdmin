import React from "react";
import { PaymentRecordDto } from "../../types/paymentrecord..type";
import Badge from "../ui/badge/Badge";

interface PaymentRecordTableProps {
  paymentRecords: PaymentRecordDto[];
  loading: boolean;
  onEdit: (paymentRecord: PaymentRecordDto) => void;
  onDelete: (id: string) => void;
}

const PaymentRecordTable: React.FC<PaymentRecordTableProps> = ({
  paymentRecords,
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
              User ID
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Room
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Payment Method
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Price
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Status
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paymentRecords.map((record) => (
            <tr
              key={record.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {record.userId.substring(0, 8)}...
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {record.roomName}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {record.paymentMethodName}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                ${record.price.toLocaleString()}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs">
                <Badge color={record.status === 1 ? "success" : "warning"}>
                  {record.status === 1 ? "Success" : "Pending"}
                </Badge>
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(record)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 px-3 py-1 rounded-md text-xs transition-colors bg-blue-100 dark:bg-blue-900/30"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(record.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500 px-3 py-1 rounded-md text-xs transition-colors bg-red-100 dark:bg-red-900/30"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {paymentRecords.length === 0 && !loading && (
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
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-lg mb-2">No payment records yet</p>
          <p className="text-sm">Add your first record to get started.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentRecordTable;
