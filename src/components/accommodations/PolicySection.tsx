// PolicySection.tsx - Updated with null checks to prevent crashes
import React from "react";
import type { Policy } from "../../types/accommodation.types";

interface Props {
  policy: Policy | null; // Allow null
  onEdit: () => void;
  onDelete: () => void;
}

const PolicySection: React.FC<Props> = ({ policy, onEdit, onDelete }) => {
  if (!policy) {
    return (
      <section className="mb-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 relative">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold">Policies</h2>
          <button
            onClick={onEdit}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm mr-2"
          >
            Add
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          No policy information available.
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold">Policies</h2>
        <div className="space-x-2">
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p>
          <strong>Check-in:</strong> {policy.checkIn || "N/A"}
        </p>
        <p>
          <strong>Check-out:</strong> {policy.checkOut || "N/A"}
        </p>
        <p>
          <strong>Breakfast:</strong> {policy.breakfast || "N/A"}
        </p>
        <p>
          <strong>Smoking:</strong> {policy.smoking || "N/A"}
        </p>
        <p>
          <strong>Pets:</strong> {policy.pets || "N/A"}
        </p>
        {policy.instruction && (
          <p>
            <strong>Instructions:</strong> {policy.instruction}
          </p>
        )}
        {policy.requiredDocs && (
          <p>
            <strong>Required Docs:</strong> {policy.requiredDocs}
          </p>
        )}
        {policy.additional && (
          <p>
            <strong>Additional:</strong> {policy.additional}
          </p>
        )}
      </div>
    </section>
  );
};

export default PolicySection;
