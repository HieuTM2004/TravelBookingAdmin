// RoomCategories.tsx
import React, { useState, useEffect } from "react";
import { getAccommodations } from "../../api/accommodationAPI"; // For accom dropdown
import {
  getRoomCategoriesByAccomId,
  createRoomCategory,
  updateRoomCategory,
  deleteRoomCategory,
  getRoomCategoryById,
} from "../../api/roomcategoryAPI";
import type {
  RoomCategoryCreateDto,
  RoomCategoryUpdateDto,
  RoomCategoryDto,
} from "../../types/roomcategory.types";
import RoomCategoryModal from "../../components/roomManage/roomCategories/RoomCategoryModal";
import RoomCategoryAssignModal from "../../components/roomManage/roomCategories/RoomCategoryAssignModal";
import { AccommodationSummary } from "../../types/accommodation.types";
import RoomCategoryList from "../../components/roomManage/roomCategories/RoomCategoryList";

const RoomCategories: React.FC = () => {
  const [roomCategories, setRoomCategories] = useState<RoomCategoryDto[]>([]);
  const [accommodations, setAccommodations] = useState<AccommodationSummary[]>(
    []
  );
  const [selectedAccomId, setSelectedAccomId] = useState<string>(""); // Filter by accom
  const [selectedAccomName, setSelectedAccomName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<RoomCategoryCreateDto>({
    name: "",
    basicFacilities: [],
    roomFacilities: [],
    bathAmenities: [],
    about: "",
    accomId: "",
  });
  const [assignType, setAssignType] = useState<"image" | "facility">("image"); // For assign modal

  // Fetch accommodations for dropdown
  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const data = await getAccommodations({ pageSize: 100 }); // Fetch all or paginate
      setAccommodations(data.items);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  const handleFilterChange = (accomId: string) => {
    setSelectedAccomId(accomId);
    const selectedAccom = accommodations.find((accom) => accom.id === accomId);
    setSelectedAccomName(selectedAccom?.name || "");
    if (accomId) {
      fetchRoomCategories(accomId);
    } else {
      setRoomCategories([]);
    }
  };

  // Fetch room categories based on selected accom
  useEffect(() => {
    if (selectedAccomId) {
      fetchRoomCategories(selectedAccomId);
    } else {
      setRoomCategories([]); // Clear if no filter
    }
  }, [selectedAccomId]);

  const fetchRoomCategories = async (accomId: string) => {
    setLoading(true);
    try {
      const data = await getRoomCategoriesByAccomId(accomId);
      setRoomCategories(data);
    } catch (error) {
      console.error("Error fetching room categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRoomCategory(editingId, formData as RoomCategoryUpdateDto);
      } else {
        await createRoomCategory(formData);
      }
      fetchRoomCategories(selectedAccomId);
      setShowCreateModal(false);
      setEditingId(null);
      setFormData({
        name: "",
        basicFacilities: [],
        roomFacilities: [],
        bathAmenities: [],
        about: "",
        accomId: selectedAccomId, // Keep filter
      });
    } catch (error) {
      console.error("Error saving room category:", error);
    }
  };

  // Handle edit (fetch full detail)
  const handleEdit = async (roomCategory: RoomCategoryDto) => {
    try {
      setEditingId(roomCategory.id);
      const fullDetail = await getRoomCategoryById(roomCategory.id);
      setFormData({
        name: fullDetail.name,
        basicFacilities: fullDetail.basicFacilities,
        roomFacilities: fullDetail.roomFacilities,
        bathAmenities: fullDetail.bathAmenities,
        about: fullDetail.about,
        accomId: fullDetail.accomId,
      });
      setShowCreateModal(true);
    } catch (error) {
      console.error("Error fetching room category details:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this room category?")) {
      try {
        await deleteRoomCategory(id);
        fetchRoomCategories(selectedAccomId);
      } catch (error) {
        console.error("Error deleting room category:", error);
      }
    }
  };

  // Open assign modal
  const handleOpenAssign = (type: "image" | "facility") => {
    setAssignType(type);
    setShowAssignModal(true);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Room Categories</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition-all hover:shadow-lg"
          disabled={!selectedAccomId}
        >
          Add New
        </button>
      </div>

      {/* Filter by Accommodation */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Accommodation
        </label>
        <select
          value={selectedAccomId}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="w-full max-w-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Accommodation</option>
          {accommodations.map((accom) => (
            <option key={accom.id} value={accom.id}>
              {accom.name} ({accom.location})
            </option>
          ))}
        </select>
        {selectedAccomName && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
            Selected: {selectedAccomName}
          </p>
        )}
      </div>

      <RoomCategoryList
        roomCategories={roomCategories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onOpenAssign={handleOpenAssign}
      />
      {/* Table */}
      {/* <RoomCategoryTable
        roomCategories={roomCategories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onOpenAssign={handleOpenAssign}
      /> */}

      {/* Modals */}
      <RoomCategoryModal
        show={showCreateModal}
        editingId={editingId}
        formData={formData}
        onClose={() => {
          setShowCreateModal(false);
          setEditingId(null);
          setFormData({
            name: "",
            basicFacilities: [],
            roomFacilities: [],
            bathAmenities: [],
            about: "",
            accomId: selectedAccomId,
          });
        }}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
        selectedAccomName={selectedAccomName}
      />

      <RoomCategoryAssignModal
        show={showAssignModal}
        type={assignType}
        onClose={() => setShowAssignModal(false)}
        onAssign={(id) => {
          // Handle assign based on type (image or facility)
          console.log(`Assign ${assignType}: ${id}`); // Replace with actual logic
          setShowAssignModal(false);
        }}
      />
    </div>
  );
};

export default RoomCategories;
