// api/roomcategoryAPI.ts
import apiClient from "./apiClient";
import type {
  RoomCategoryDto,
  RoomCategoryCreateDto,
  RoomCategoryUpdateDto,
} from "../types/roomcategory.types";

// GET /api/RoomCategory/Accommodations/{accomId}
export const getRoomCategoriesByAccomId = async (
  accomId: string
): Promise<RoomCategoryDto[]> => {
  const response = await apiClient.get(
    `/RoomCategory/Accommodations/${accomId}`
  );
  return response.data;
};

// GET /api/RoomCategory/{id}
export const getRoomCategoryById = async (
  id: string
): Promise<RoomCategoryDto> => {
  const response = await apiClient.get(`/RoomCategory/${id}`);
  return response.data;
};

// POST /api/RoomCategory
export const createRoomCategory = async (
  data: RoomCategoryCreateDto
): Promise<string> => {
  const response = await apiClient.post("/RoomCategory", data);
  return response.data; // Returns GUID
};

// PUT /api/RoomCategory/{id}
export const updateRoomCategory = async (
  id: string,
  data: RoomCategoryUpdateDto
): Promise<void> => {
  await apiClient.put(`/RoomCategory/${id}`, data);
};

// DELETE /api/RoomCategory/{id}
export const deleteRoomCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`/RoomCategory/${id}`);
};

// POST /api/RoomCategory/{roomCategoryId}/images/{imageId}
export const assignImageToRoomCategory = async (
  roomCategoryId: string,
  imageId: string
): Promise<void> => {
  await apiClient.post(
    `/RoomCategory/${roomCategoryId}/images`,
    `"${imageId}"`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// DELETE /api/RoomCategory/{roomCategoryId}/images/{imageId}
export const removeImageFromRoomCategory = async (
  roomCategoryId: string,
  imageId: string
): Promise<void> => {
  await apiClient.delete(`/RoomCategory/${roomCategoryId}/images/${imageId}`);
};

// POST /api/RoomCategory/{roomCategoryId}/facilities/{facilityId}
export const assignFacilityToRoomCategory = async (
  roomCategoryId: string,
  facilityId: string
): Promise<void> => {
  await apiClient.post(
    `/RoomCategory/${roomCategoryId}/facilities`,
    `"${facilityId}"`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// DELETE /api/RoomCategory/{roomCategoryId}/facilities/{facilityId}
export const removeFacilityFromRoomCategory = async (
  roomCategoryId: string,
  facilityId: string
): Promise<void> => {
  await apiClient.delete(
    `/RoomCategory/${roomCategoryId}/facilities/${facilityId}`
  );
};
