// accommodationAPI.ts - Updated to import types from separate file
import {
  AccomCreateDto,
  AccomDetailDto,
  AccommodationSummary,
  AccomUpdateDto,
  GeneralInfo,
  PagedResult,
  Policy,
} from "../types/accommodation.types";
import apiClient from "./apiClient";
// GET /api/accommodation - Search & pagination
export const getAccommodations = async (
  params: {
    q?: string;
    accomTypeId?: string;
    starMin?: number;
    ratingMin?: number;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
  } = {}
): Promise<PagedResult<AccommodationSummary>> => {
  const response = await apiClient.get("/Accommodation", { params });
  return response.data;
};

// GET /api/accommodation/{id}
export const getAccommodationById = async (
  id: string
): Promise<AccomDetailDto> => {
  const response = await apiClient.get(`/Accommodation/${id}`);
  return response.data;
};

// POST /api/accommodation
export const createAccommodation = async (
  data: AccomCreateDto
): Promise<string> => {
  const response = await apiClient.post("/Accommodation", data);
  return response.data; // Returns GUID
};

// POST /api/accommodation/bulk
export const createBulkAccommodations = async (
  data: AccomCreateDto[]
): Promise<AccomCreateDto[]> => {
  const response = await apiClient.post("/accommodation/bulk", data);
  return response.data;
};

// PUT /api/accommodation/{id}
export const updateAccommodation = async (
  id: string,
  data: AccomUpdateDto
): Promise<void> => {
  await apiClient.put(`/accommodation/${id}`, data);
};

// DELETE /api/accommodation/{id}
export const deleteAccommodation = async (id: string): Promise<void> => {
  await apiClient.delete(`/accommodation/${id}`);
};

// For sub-resources (e.g., General Info, Policy) - Add as needed
// GET /api/accommodation/{accomId}/general-info
export const getGeneralInfo = async (accomId: string) => {
  const response = await apiClient.get(
    `/accommodation/${accomId}/general-info`
  );
  return response.data;
};

// PUT /api/accommodation/{accomId}/general-info
export const updateGeneralInfo = async (
  accomId: string,
  data: Partial<GeneralInfo>
): Promise<void> => {
  await apiClient.put(`/Accommodation/${accomId}/general-info`, data);
};

// DELETE /api/Accommodation/{accomId}/general-info
export const deleteGeneralInfo = async (accomId: string): Promise<void> => {
  await apiClient.delete(`/Accommodation/${accomId}/general-info`);
};

// PUT /api/Accommodation/{accomId}/policy
export const updatePolicy = async (
  accomId: string,
  data: Partial<Policy>
): Promise<void> => {
  await apiClient.put(`/Accommodation/${accomId}/policy`, data);
};

// DELETE /api/Accommodation/{accomId}/policy
export const deletePolicy = async (accomId: string): Promise<void> => {
  await apiClient.delete(`/Accommodation/${accomId}/policy`);
};

// POST /api/Accommodation/{accomId}/images/{imageId}
export const assignImage = async (
  accomId: string,
  imageId: string
): Promise<void> => {
  await apiClient.post(`/Accommodation/${accomId}/images`, `"${imageId}"`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// DELETE /api/Accommodation/{accomId}/images/{imageId}
export const removeImage = async (
  accomId: string,
  imageId: string
): Promise<void> => {
  await apiClient.delete(`/Accommodation/${accomId}/images/${imageId}`);
};

// POST /api/Accommodation/{accomId}/facilities/{facilityId}
export const assignFacility = async (
  accomId: string,
  facilityId: string
): Promise<void> => {
  await apiClient.post(
    `/Accommodation/${accomId}/facilites`,
    `"${facilityId}"`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// DELETE /api/Accommodation/{accomId}/facilities/{facilityId}
export const removeFacility = async (
  accomId: string,
  facilityId: string
): Promise<void> => {
  await apiClient.delete(`/Accommodation/${accomId}/facilities/${facilityId}`);
};
