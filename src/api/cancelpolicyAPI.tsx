import apiClient from "./apiClient";
import type {
  CancelPolicyDto,
  CancelPolicyCreateDto,
  CancelPolicyUpdateDto,
} from "../types/cancelpolicy.types";

// GET /api/CancelPolicy - List all
export const getCancelPolicies = async (): Promise<CancelPolicyDto[]> => {
  const response = await apiClient.get("/CancelPolicy");
  return response.data;
};

// GET /api/CancelPolicy/{id} - Detail
export const getCancelPolicyById = async (
  id: string
): Promise<CancelPolicyDto> => {
  const response = await apiClient.get(`/CancelPolicy/${id}`);
  return response.data;
};

// POST /api/CancelPolicy
export const createCancelPolicy = async (
  data: CancelPolicyCreateDto
): Promise<string> => {
  const response = await apiClient.post("/CancelPolicy", data);
  return response.data; // Returns GUID
};

// PUT /api/CancelPolicy/{id}
export const updateCancelPolicy = async (
  id: string,
  data: CancelPolicyUpdateDto
): Promise<void> => {
  await apiClient.put(`/CancelPolicy/${id}`, data);
};

// DELETE /api/CancelPolicy/{id}
export const deleteCancelPolicy = async (id: string): Promise<void> => {
  await apiClient.delete(`/CancelPolicy/${id}`);
};
