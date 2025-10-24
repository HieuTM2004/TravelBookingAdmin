// ReviewsSection.tsx
import React from "react";
import type { Review } from "../../types/accommodation.types";

interface Props {
  reviews: Review[];
}

const ReviewsSection: React.FC<Props> = ({ reviews }) => {
  return (
    <section className="p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 border rounded">
              {/* Render review details here when data available */}
              <p>Review content placeholder</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
