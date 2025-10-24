// api/bedtypeAPI.ts
import type {
  BedTypeDto,
  BedTypeCreateDto,
  BedTypeUpdateDto,
} from "../types/bedtype.types";
import apiClient from "./apiClient";

// GET /api/BedType - List all
export const getBedTypes = async (): Promise<BedTypeDto[]> => {
  const response = await apiClient.get("/BedType");
  return response.data;
};

// GET /api/BedType/{id} - Detail (commented if error, but keep for future)
export const getBedTypeById = async (id: string): Promise<BedTypeDto> => {
  const response = await apiClient.get(`/BedType/${id}`);
  return response.data;
};

// POST /api/BedType
export const createBedType = async (
  data: BedTypeCreateDto
): Promise<string> => {
  const response = await apiClient.post("/BedType", data);
  return response.data; // Returns GUID
};

// PUT /api/BedType/{id}
export const updateBedType = async (
  id: string,
  data: BedTypeUpdateDto
): Promise<void> => {
  await apiClient.put(`/BedType/${id}`, data);
};

// DELETE /api/BedType/{id}
export const deleteBedType = async (id: string): Promise<void> => {
  await apiClient.delete(`/BedType/${id}`);
};
