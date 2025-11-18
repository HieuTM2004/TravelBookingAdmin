import apiClient from "./apiClient";
import type {
  ReviewDto,
  ReviewCreateDto,
  ReviewUpdateDto,
} from "../types/reviews.types";

// GET /api/reviewsandrating/Accommodations/{accomId}
export const getReviewsByAccomId = async (
  accomId: string
): Promise<ReviewDto[]> => {
  const response = await apiClient.get(
    `/ReviewsAndRating/Accommodations/${accomId}`
  );
  return response.data;
};

// POST /api/reviewsandrating/Accommodations/{accomId}
export const createReview = async (
  accomId: string,
  data: ReviewCreateDto
): Promise<string> => {
  const response = await apiClient.post(
    `/ReviewsAndRating/Accommodations/${accomId}`,
    data
  );
  return response.data; // Returns GUID
};

// GET /api/reviewsandrating/{id}
export const getReviewById = async (id: string): Promise<ReviewDto> => {
  const response = await apiClient.get(`/ReviewsAndRating/${id}`);
  return response.data;
};

// PUT /api/reviewsandrating/{id}
export const updateReview = async (
  id: string,
  data: ReviewUpdateDto
): Promise<void> => {
  await apiClient.put(`/ReviewsAndRating/${id}`, data);
};

// DELETE /api/reviewsandrating/{id}
export const deleteReview = async (id: string): Promise<void> => {
  await apiClient.delete(`/ReviewsAndRating/${id}`);
};
