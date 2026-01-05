// Facilities.tsx - Main list page (modern table with icon preview)
import React, { useState, useEffect } from "react";
import {
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
  getFacilityById,
} from "../../api/facilityAPI";
import type {
  FacilityCreateDto,
  FacilityUpdateDto,
  FacilityDto,
} from "../../types/facility.types";
import FacilityTable from "../../components/facilities/FacilityTable";
import FacilityModal from "../../components/facilities/FacilityModal";

const Facilities: React.FC = () => {
  const [facilities, setFacilities] = useState<FacilityDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FacilityCreateDto>({
    name: "",
    icon: "",
  });

  // Search term and derived filtered list
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFacilities = React.useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return facilities;
    return facilities.filter((f) => f.name?.toLowerCase().includes(q));
  }, [facilities, searchTerm]);

  // Fetch all facilities
  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const data = await getFacilities();
      setFacilities(data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateFacility(editingId, formData as FacilityUpdateDto);
      } else {
        await createFacility(formData);
      }
      fetchFacilities(); // Refresh list
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: "", icon: "" });
    } catch (error) {
      console.error("Error saving facility:", error);
    }
  };

  // Handle edit (fetch full detail)
  const handleEdit = async (facility: FacilityDto) => {
    try {
      setEditingId(facility.id);
      const fullDetail = await getFacilityById(facility.id);
      setFormData({
        name: fullDetail.name,
        icon: fullDetail.icon,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching facility details:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      try {
        await deleteFacility(id);
        fetchFacilities();
      } catch (error) {
        console.error("Error deleting facility:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Facilities</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition-all hover:shadow-lg flex items-center space-x-2"
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

      {/* Search/Filter (optional, for name/icon) */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full max-w-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <FacilityTable
        facilities={filteredFacilities}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FacilityModal
        show={showModal}
        editingId={editingId}
        formData={formData}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ name: "", icon: "" });
        }}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
      />
    </div>
  );
};

export default Facilities;
