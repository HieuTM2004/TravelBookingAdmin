// AccomTypes.tsx - Main list page (place in pages/AccommodationManagement/AccomTypes.tsx)
import React, { useState, useEffect } from "react";
import {
  getAccomTypes,
  createAccomType,
  updateAccomType,
  deleteAccomType,
  getAccomTypeById,
} from "../../api/accomtypeAPI";
import type {
  AccomTypeCreateDto,
  AccomTypeUpdateDto,
  AccomTypeDto,
} from "../../types/accomtype.types";
import AccomTypeTable from "../../components/accomTypes/AccomTypeTable";
import AccomTypeModal from "../../components/accomTypes/AccomTypeModal";

const AccomTypes: React.FC = () => {
  const [accomTypes, setAccomTypes] = useState<AccomTypeDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AccomTypeCreateDto>({
    type: "",
  });

  // Fetch all accom types
  useEffect(() => {
    fetchAccomTypes();
  }, []);

  const fetchAccomTypes = async () => {
    setLoading(true);
    try {
      const data = await getAccomTypes();
      setAccomTypes(data);
    } catch (error) {
      console.error("Error fetching accom types:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAccomType(editingId, {
          type: formData.type,
        } as AccomTypeUpdateDto);
      } else {
        await createAccomType(formData);
      }
      fetchAccomTypes(); // Refresh list
      setShowModal(false);
      setEditingId(null);
      setFormData({ type: "" });
    } catch (error) {
      console.error("Error saving accom type:", error);
    }
  };

  // Handle edit (fetch detail for full data if needed, but simple here)
  const handleEdit = async (accomType: AccomTypeDto) => {
    try {
      setEditingId(accomType.id);
      setFormData({ type: accomType.type });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching accom type details:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this accom type?")) {
      try {
        await deleteAccomType(id);
        fetchAccomTypes();
      } catch (error) {
        console.error("Error deleting accom type:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Accommodation Types</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition-shadow"
        >
          Add New
        </button>
      </div>

      <AccomTypeTable
        accomTypes={accomTypes}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AccomTypeModal
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

export default AccomTypes;
