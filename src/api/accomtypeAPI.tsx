// api/accomtypeAPI.ts
import apiClient from "./apiClient";
import type {
  AccomTypeDto,
  AccomTypeCreateDto,
  AccomTypeUpdateDto,
} from "../types/accomtype.types";

// GET /api/AccomType - List all
export const getAccomTypes = async (): Promise<AccomTypeDto[]> => {
  const response = await apiClient.get("/AccomType");
  return response.data;
};

// GET /api/AccomType/{id}
export const getAccomTypeById = async (id: string): Promise<AccomTypeDto> => {
  const response = await apiClient.get(`/AccomType/${id}`);
  return response.data;
};

// POST /api/AccomType
export const createAccomType = async (
  data: AccomTypeCreateDto
): Promise<string> => {
  const response = await apiClient.post("/AccomType", data);
  return response.data; // Returns GUID
};

// PUT /api/AccomType/{id}
export const updateAccomType = async (
  id: string,
  data: AccomTypeUpdateDto
): Promise<void> => {
  await apiClient.put(`/AccomType/${id}`, data);
};

// DELETE /api/AccomType/{id}
export const deleteAccomType = async (id: string): Promise<void> => {
  await apiClient.delete(`/AccomType/${id}`);
};
