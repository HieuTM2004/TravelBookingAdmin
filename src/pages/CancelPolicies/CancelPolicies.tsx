// CancelPolicies.tsx - Main list page (modern, clean layout with search)
import React, { useState, useEffect } from "react";
import {
  getCancelPolicies,
  createCancelPolicy,
  updateCancelPolicy,
  deleteCancelPolicy,
  getCancelPolicyById,
} from "../../api/cancelpolicyAPI";
import type {
  CancelPolicyCreateDto,
  CancelPolicyUpdateDto,
  CancelPolicyDto,
} from "../../types/cancelpolicy.types";
import CancelPolicyTable from "../../components/policy/CancelPolicyTable";
import CancelPolicyModal from "../../components/policy/CancelPolicyModal";

const CancelPolicies: React.FC = () => {
  const [cancelPolicies, setCancelPolicies] = useState<CancelPolicyDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CancelPolicyCreateDto>({
    type: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // Search by type

  // Fetch all cancel policies
  useEffect(() => {
    fetchCancelPolicies();
  }, [searchTerm]);

  const fetchCancelPolicies = async () => {
    setLoading(true);
    try {
      const data = await getCancelPolicies();
      let filtered = data;
      if (searchTerm.trim()) {
        filtered = data.filter((policy) =>
          policy.type.toLowerCase().includes(searchTerm.toLowerCase().trim())
        );
      }
      setCancelPolicies(filtered);
    } catch (error) {
      console.error("Error fetching cancel policies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCancelPolicy(editingId, {
          type: formData.type,
        } as CancelPolicyUpdateDto);
      } else {
        await createCancelPolicy(formData);
      }
      fetchCancelPolicies(); // Refresh list
      setShowModal(false);
      setEditingId(null);
      setFormData({ type: "" });
    } catch (error) {
      console.error("Error saving cancel policy:", error);
    }
  };

  // Handle edit (fetch full detail if needed, but simple here)
  const handleEdit = async (cancelPolicy: CancelPolicyDto) => {
    try {
      setEditingId(cancelPolicy.id);
      const fullDetail = await getCancelPolicyById(cancelPolicy.id);
      setFormData({ type: fullDetail.type });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching cancel policy details:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this cancel policy?")) {
      try {
        await deleteCancelPolicy(id);
        fetchCancelPolicies();
      } catch (error) {
        console.error("Error deleting cancel policy:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cancel Policies</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage cancellation policy options for bookings
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all hover:shadow-lg flex items-center space-x-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Add New</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search Policies
        </label>
        <input
          type="text"
          placeholder="Search by policy type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <CancelPolicyTable
        cancelPolicies={cancelPolicies}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CancelPolicyModal
        show={showModal}
        editingId={editingId}
        formData={formData}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ type: "" });
        }}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
      />
    </div>
  );
};

export default CancelPolicies;
