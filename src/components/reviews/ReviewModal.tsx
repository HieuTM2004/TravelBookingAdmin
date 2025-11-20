// ReviewModal.tsx - Modal with rating stars/select, textarea for review, accom dropdown
import React, { useEffect, useState } from "react";
import type { ReviewCreateDto } from "../../types/reviews.types";
import type { AccommodationSummary } from "../../types/accommodation.types";

interface ReviewModalProps {
  show: boolean;
  editingId: string | null;
  formData: ReviewCreateDto;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: ReviewCreateDto) => void;
  selectedAccomId: string;
  accommodations: AccommodationSummary[];
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  show,
  editingId,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
}) => {
  const [tempRating, setTempRating] = useState(formData.rating);

  useEffect(() => {
    setTempRating(formData.rating);
  }, [formData.rating]);

  if (!show) return null;

  const handleChange = (
    field: keyof ReviewCreateDto,
    value: number | string
  ) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const renderStarsInput = () => {
    return (
      <div className="flex items-center space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              star <= tempRating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            onClick={() => {
              setTempRating(star);
              handleChange("rating", star);
            }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full shadow-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingId ? "Edit Review" : "Add New Review"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating
            </label>
            {renderStarsInput()}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click stars to rate (1-5)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Review Text
            </label>
            <textarea
              placeholder="Write your review here..."
              value={formData.review}
              onChange={(e) => handleChange("review", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-sm transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
