// Rooms.tsx - Main page with filter, search, table, modals
import React, { useState, useEffect } from "react";
import { getRoomCategoriesByAccomId } from "../../api/roomcategoryAPI"; // For category dropdown
import {
  getRoomsByCategoryId,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
} from "../../api/roomAPI";
import type {
  RoomCreateDto,
  RoomUpdateDto,
  RoomSummary,
} from "../../types/room.types";
import { RoomCategoryDto } from "../../types/roomcategory.types";
import RoomTable from "../../components/roomManage/rooms/RoomTable";
import RoomModal from "../../components/roomManage/rooms/RoomModal";
import { useNavigate } from "react-router-dom";

const Rooms: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomSummary[]>([]);
  const [categories, setCategories] = useState<RoomCategoryDto[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(""); // Filter by category
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<RoomCreateDto>({
    name: "",
    breakfast: true,
    numberOfBeds: 1,
    bedTypeId: "",
    cancelPolicyId: "",
    categoryId: "",
    available: true,
    rating: 0,
  });
  const [searchTerm, setSearchTerm] = useState(""); // Search by name

  // Fetch categories for dropdown
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch from a sample accom or all; adjust as needed
      const sampleAccomId = "bbbb1111-2222-3333-4444-555566667777"; // Dynamic if needed
      const data = await getRoomCategoriesByAccomId(sampleAccomId);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch rooms based on selected category and search
  useEffect(() => {
    if (selectedCategoryId) {
      fetchRooms(selectedCategoryId);
    } else {
      setRooms([]);
    }
  }, [selectedCategoryId, searchTerm]);

  const fetchRooms = async (categoryId: string) => {
    setLoading(true);
    try {
      const data = await getRoomsByCategoryId(categoryId);
      let filtered = data;
      if (searchTerm.trim()) {
        filtered = data.filter((room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        );
      }
      setRooms(filtered);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id: string) => {
    navigate(`/rooms/${id}`);
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRoom(editingId, formData as RoomUpdateDto);
      } else {
        await createRoom(formData);
      }
      fetchRooms(selectedCategoryId);
      setShowModal(false);
      setEditingId(null);
      setFormData({
        name: "",
        breakfast: true,
        numberOfBeds: 1,
        bedTypeId: "",
        cancelPolicyId: "",
        categoryId: selectedCategoryId,
        available: true,
        rating: 0,
      });
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  // Handle edit (fetch full detail)
  const handleEdit = async (room: RoomSummary) => {
    try {
      setEditingId(room.id);
      const fullDetail = await getRoomById(room.id);
      setFormData({
        name: fullDetail.name,
        breakfast: fullDetail.breakfast,
        numberOfBeds: fullDetail.numberOfBeds,
        bedTypeId: fullDetail.bedTypeId,
        cancelPolicyId: fullDetail.cancelPolicyId,
        categoryId: fullDetail.categoryId,
        available: fullDetail.available,
        rating: fullDetail.rating,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(id);
        fetchRooms(selectedCategoryId);
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  // Handle bulk create

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rooms</h1>
        <div className="space-x-2">
          <button
            onClick={() => true}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded shadow-md transition-all hover:shadow-lg text-sm"
            disabled={!selectedCategoryId}
          >
            Bulk Add
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition-all hover:shadow-lg text-sm"
            disabled={!selectedCategoryId}
          >
            Add New
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Rooms
          </label>
          <input
            type="text"
            placeholder="Search by room name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <RoomTable
        rooms={rooms.filter((room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Modals */}
      <RoomModal
        show={showModal}
        editingId={editingId}
        formData={formData}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({
            name: "",
            breakfast: true,
            numberOfBeds: 1,
            bedTypeId: "",
            cancelPolicyId: "",
            categoryId: selectedCategoryId,
            available: true,
            rating: 0,
          });
        }}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
        categories={categories}
      />
    </div>
  );
};

export default Rooms;
