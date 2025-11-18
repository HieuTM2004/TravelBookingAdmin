// ReviewsSection.tsx - Complete modern review cards with stars, expandable text
import React, { useState } from "react";
import type { Review } from "../../types/accommodation.types"; // Assume Review type matches data (add to types if needed)
import Badge from "../ui/badge/Badge";

interface Props {
  reviews: Review[];
}

const ReviewsSection: React.FC<Props> = ({ reviews }) => {
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(
    new Set()
  ); // Track expanded reviews

  const toggleExpand = (reviewId: string) => {
    const newSet = new Set(expandedReviews);
    if (newSet.has(reviewId)) {
      newSet.delete(reviewId);
    } else {
      newSet.add(reviewId);
    }
    setExpandedReviews(newSet);
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center space-x-0.5 mb-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 transition-colors ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const getStatusColor = (rating: number) => {
    if (rating >= 4) return "success";
    if (rating >= 3) return "warning";
    return "error";
  };

  if (reviews.length === 0) {
    return (
      <section className="p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg
            className="mx-auto h-12 w-12 mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg mb-2">No reviews yet</p>
          <p className="text-sm">Be the first to leave a review!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-6 flex items-center justify-between">
        <span>Reviews ({reviews.length})</span>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>
            Average Rating:{" "}
            {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) |
              0}
          </span>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const displayReview = isExpanded
            ? review.review
            : review.review.substring(0, 100) + "...";

          return (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {renderStars(review.rating)}
                    <Badge color={getStatusColor(review.rating)} size="sm">
                      {review.rating}/5
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {displayReview}
                  {review.review.length > 100 && (
                    <button
                      onClick={() => toggleExpand(review.id)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium ml-1"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </p>
                <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>
                      {review.userId.substring(0, 8)}... (
                      {review.userName || "Anonymous"})
                    </span>
                  </span>
                  <span className="flex items-center space-x-1">
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span>
                      {review.accomId
                        ? review.accomId.substring(0, 8) + "..."
                        : "N/A"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewsSection;
