// Accommodations.tsx - Main component, now orchestrating sub-components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccommodations,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  getAccommodationById,
} from "../../api/accommodationAPI";
import type {
  AccomCreateDto,
  // AccomUpdateDto,
  PagedResult,
  AccommodationSummary,
  AccomDetailDto,
} from "../../types/accommodation.types";
import SearchBar from "../../components/accommodations/SearchBar";
import AccommodationTable from "../../components/accommodations/AccommodationTable";
import PaginationComponent from "../../components/accommodations/Pagination";
import AccommodationModal from "../../components/accommodations/AccommodationModal";

const Accommodations: React.FC = () => {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState<AccommodationSummary[]>(
    []
  );
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AccomCreateDto>({
    name: "",
    email: "",
    phone: "",
    accomTypeId: "",
    ggMapsQuery: "",
    ll: "",
    star: 1,
    description: "",
    address: "",
    location: "",
  });

  // Fetch accommodations
  useEffect(() => {
    fetchAccommodations();
  }, [currentPage, searchTerm]);

  const fetchAccommodations = async () => {
    setLoading(true);
    try {
      const params = {
        q: searchTerm || undefined,
        page: currentPage,
        pageSize,
        sortBy: "name",
        sortDir: "asc" as const,
      };
      const data: PagedResult<AccommodationSummary> = await getAccommodations(
        params
      );
      setAccommodations(data.items);
      setTotalCount(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        console.log("Updating accommodation:", editingId, formData);
        await updateAccommodation(editingId, formData);
      } else {
        const createData = { ...formData, price: 0 }; // Add price for create if required
        await createAccommodation(createData as AccomCreateDto);
      }
      fetchAccommodations();
      setShowModal(false);
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        accomTypeId: "",
        ggMapsQuery: "",
        ll: "",
        star: 1,
        description: "",
        address: "",
        location: "",
      });
    } catch (error) {
      console.error("Error saving accommodation:", error);
    }
  };

  // Handle edit
  const handleEdit = async (accom: AccommodationSummary) => {
    setEditingId(accom.id);
    const fullDetail: AccomDetailDto = await getAccommodationById(accom.id);
    setFormData({
      name: fullDetail.name,
      email: fullDetail.email || "", // Handle null
      phone: fullDetail.phone || "", // Handle null
      accomTypeId: fullDetail.accomTypeId,
      ggMapsQuery: fullDetail.ggMapsQuery,
      ll: fullDetail.ll,
      star: fullDetail.star,
      description: fullDetail.description || "", // Handle null
      address: fullDetail.address,
      location: fullDetail.location,
    });
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteAccommodation(id);
        fetchAccommodations();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  // Handle view
  const handleView = (id: string) => {
    navigate(`/accommodations/viewDetail/${id}`);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Display limited page numbers (e.g., 5 pages around current)
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Accommodations
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      {/* Search */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={fetchAccommodations}
      />

      {/* Table */}
      <AccommodationTable
        accommodations={accommodations}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        onPrev={handlePrev}
        onNext={handleNext}
        getPageNumbers={getPageNumbers}
      />

      {/* Modal */}
      <AccommodationModal
        show={showModal}
        editingId={editingId}
        formData={formData}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
      />
    </div>
  );
};

export default Accommodations;
