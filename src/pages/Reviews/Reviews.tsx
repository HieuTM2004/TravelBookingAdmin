import React, { useState, useEffect } from "react";
import { getAccommodations } from "../../api/accommodationAPI"; // For accom dropdown
import {
  getReviewsByAccomId,
  deleteReview,
  getReviewById,
} from "../../api/reviewsAPI";
import type { ReviewDto } from "../../types/reviews.types";
import { AccommodationSummary } from "../../types/accommodation.types";
import ReviewTable from "../../components/reviews/ReviewTable";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [accommodations, setAccommodations] = useState<AccommodationSummary[]>(
    []
  );
  const [selectedAccomId, setSelectedAccomId] = useState<string>(""); // Filter by accom
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search by review/user
  const [showDropdown, setShowDropdown] = useState(false);

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

  const filteredAccommodations = accommodations.filter(
    (accom) =>
      accom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (accom.location &&
        accom.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  const handleEdit = async (review: ReviewDto) => {
    try {
      await getReviewById(review.id);
    } catch (error) {
      console.error("Error fetching review details:", error);
    }
  };

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

  const handleFilterChange = (accomId: string) => {
    setSelectedAccomId(accomId);
    setSearchTerm(""); // Clear search
    setShowDropdown(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reviews</h1>
      </div>

      {/* Filter & Search */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Accommodation
        </label>
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by name or location (e.g., 'Sunrise' or 'New York')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Filtered Dropdown List */}
          {showDropdown && filteredAccommodations.length > 0 && (
            <ul className="absolute z-50 w-full max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-1 shadow-lg">
              {filteredAccommodations.slice(0, 10).map((accom) => (
                <li key={accom.id}>
                  <button
                    type="button"
                    onClick={() => handleFilterChange(accom.id)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-600 last:border-b-0 focus:outline-none"
                  >
                    {accom.name} ({accom.location || "N/A"})
                  </button>
                </li>
              ))}
              {filteredAccommodations.length > 10 && (
                <li className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 italic">
                  Showing top 10 matches. Refine search for more.
                </li>
              )}
            </ul>
          )}
        </div>

        {selectedAccomId && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
            Filtered by:{" "}
            {accommodations.find((a) => a.id === selectedAccomId)?.name ||
              selectedAccomId}{" "}
            ({reviews.length} reviews)
          </p>
        )}
        <button
          onClick={() => {
            setSelectedAccomId("");
            setSearchTerm("");
            setShowDropdown(false);
          }}
          className="mt-2 text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          Clear Filter
        </button>
      </div>

      <ReviewTable
        reviews={reviews}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Reviews;
