import React, { useState, useEffect } from "react";
import { getAccommodations } from "../../api/accommodationAPI"; // For accom dropdown
import {
  getReviewsByAccomId,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
} from "../../api/reviewsAPI";
import type {
  ReviewCreateDto,
  ReviewUpdateDto,
  ReviewDto,
} from "../../types/reviews.types";
import { AccommodationSummary } from "../../types/accommodation.types";
import ReviewTable from "../../components/reviews/ReviewTable";
import ReviewModal from "../../components/reviews/ReviewModal";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [accommodations, setAccommodations] = useState<AccommodationSummary[]>(
    []
  );
  const [selectedAccomId, setSelectedAccomId] = useState<string>(""); // Filter by accom
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ReviewCreateDto>({
    rating: 5,
    review: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // Search by review/user

  // Fetch accommodations for dropdown
  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const data = await getAccommodations({ pageSize: 100 });
      setAccommodations(data.items);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  // Fetch reviews based on selected accom and search
  useEffect(() => {
    if (selectedAccomId) {
      fetchReviews(selectedAccomId);
    } else {
      setReviews([]);
    }
  }, [selectedAccomId, searchTerm]);

  const fetchReviews = async (accomId: string) => {
    setLoading(true);
    try {
      const data = await getReviewsByAccomId(accomId);
      let filtered = data;
      if (searchTerm.trim()) {
        filtered = data.filter(
          (review) =>
            review.review
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim()) ||
            review.userName
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim())
        );
      }
      setReviews(filtered);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateReview(editingId, formData as ReviewUpdateDto);
      } else {
        await createReview(selectedAccomId, formData);
      }
      fetchReviews(selectedAccomId); // Refresh list
      setShowModal(false);
      setEditingId(null);
      setFormData({ rating: 5, review: "" });
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  // Handle edit (fetch full detail)
  const handleEdit = async (review: ReviewDto) => {
    try {
      setEditingId(review.id);
      const fullDetail = await getReviewById(review.id);
      setFormData({
        rating: fullDetail.rating,
        review: fullDetail.review,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching review details:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id);
        fetchReviews(selectedAccomId);
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reviews</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all hover:shadow-lg flex items-center space-x-2"
          disabled={!selectedAccomId}
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
          <span>Add Review</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Reviews
          </label>
          <input
            type="text"
            placeholder="Search by review text or user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Accommodation
          </label>
          <select
            value={selectedAccomId}
            onChange={(e) => setSelectedAccomId(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Accommodations</option>
            {accommodations.map((accom) => (
              <option key={accom.id} value={accom.id}>
                {accom.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ReviewTable
        reviews={reviews}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ReviewModal
        show={showModal}
        editingId={editingId}
        formData={formData}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ rating: 5, review: "" });
        }}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
        selectedAccomId={selectedAccomId}
        accommodations={accommodations}
      />
    </div>
  );
};

export default Reviews;
