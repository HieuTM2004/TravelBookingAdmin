import apiClient from "./apiClient";
import type {
  FacilityDto,
  FacilityCreateDto,
  FacilityUpdateDto,
} from "../types/facility.types";

// GET /api/Facility - List all
export const getFacilities = async (): Promise<FacilityDto[]> => {
  const response = await apiClient.get("/Facility");
  return response.data;
};

// GET /api/Facility/{id} - Detail
export const getFacilityById = async (id: string): Promise<FacilityDto> => {
  const response = await apiClient.get(`/Facility/${id}`);
  return response.data;
};

// POST /api/Facility
export const createFacility = async (
  data: FacilityCreateDto
): Promise<string> => {
  const response = await apiClient.post("/Facility", data);
  return response.data; // Returns GUID
};

// PUT /api/Facility/{id}
export const updateFacility = async (
  id: string,
  data: FacilityUpdateDto
): Promise<void> => {
  await apiClient.put(`/Facility/${id}`, data);
};

// DELETE /api/Facility/{id}
export const deleteFacility = async (id: string): Promise<void> => {
  await apiClient.delete(`/Facility/${id}`);
};
