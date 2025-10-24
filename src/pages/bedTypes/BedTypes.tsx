// BedTypes.tsx - Main list page (modern, scientific layout)
import React, { useState, useEffect } from "react";
import {
  getBedTypes,
  createBedType,
  updateBedType,
  deleteBedType,
} from "../../api/bedtypeAPI";
import type {
  BedTypeCreateDto,
  BedTypeUpdateDto,
  BedTypeDto,
} from "../../types/bedtype.types";
import BedTypeModal from "../../components/roomManage/bedtype/BedTypeModal";
import BedTypeTable from "../../components/roomManage/bedtype/BedTypeTable";

const BedTypes: React.FC = () => {
  const [bedTypes, setBedTypes] = useState<BedTypeDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BedTypeCreateDto>({
    type: "",
  });

  // Fetch all bed types
  useEffect(() => {
    fetchBedTypes();
  }, []);

  const fetchBedTypes = async () => {
    setLoading(true);
    try {
      const data = await getBedTypes();
      setBedTypes(data);
    } catch (error) {
      console.error("Error fetching bed types:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBedType(editingId, {
          type: formData.type,
        } as BedTypeUpdateDto);
      } else {
        await createBedType(formData);
      }
      fetchBedTypes(); // Refresh list
      setShowModal(false);
      setEditingId(null);
      setFormData({ type: "" });
    } catch (error) {
      console.error("Error saving bed type:", error);
    }
  };

  // Handle edit
  const handleEdit = (bedType: BedTypeDto) => {
    setEditingId(bedType.id);
    setFormData({ type: bedType.type });
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this bed type?")) {
      try {
        await deleteBedType(id);
        fetchBedTypes();
      } catch (error) {
        console.error("Error deleting bed type:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bed Types</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage bed type options for rooms
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

      {/* Stats Cards (optional, for modern feel) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg shadow-sm border border-blue-200 dark:border-blue-800">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Types
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {bedTypes.length}
              </p>
            </div>
          </div>
        </div>
        {/* Add more stats if needed */}
      </div>

      <BedTypeTable
        bedTypes={bedTypes}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BedTypeModal
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

export default BedTypes;
