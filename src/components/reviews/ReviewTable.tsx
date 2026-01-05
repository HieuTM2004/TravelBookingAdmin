import React from "react";
import type { ReviewDto } from "../../types/reviews.types";

interface ReviewTableProps {
  reviews: ReviewDto[];
  loading: boolean;
  onEdit: (review: ReviewDto) => void;
  onDelete: (id: string) => void;
}

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
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
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 shadow-md">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Rating
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Review
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              User
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Accommodation ID
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr
              key={review.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {renderStars(review.rating)}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                <p
                  className=" border-gray-300 dark:border-gray-600 px-4 py-2"
                  title={review.review}
                >
                  {review.review}
                </p>
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {review.userName}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {review.accomId.substring(0, 8)}...
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reviews.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
          <p className="text-lg mb-2">No reviews found</p>
          <p className="text-sm">Select an accommodation to view reviews.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewTable;
