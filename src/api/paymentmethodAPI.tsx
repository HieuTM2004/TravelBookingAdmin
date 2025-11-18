import apiClient from "./apiClient";
import type {
  PaymentMethodDto,
  PaymentMethodCreateDto,
  PaymentMethodUpdateDto,
} from "../types/paymentmethod.types";

// GET /api/PaymentMethod - List all
export const getPaymentMethods = async (): Promise<PaymentMethodDto[]> => {
  const response = await apiClient.get("/PaymentMethod");
  return response.data;
};

// GET /api/PaymentMethod/{id} - Detail
export const getPaymentMethodById = async (
  id: string
): Promise<PaymentMethodDto> => {
  const response = await apiClient.get(`/PaymentMethod/${id}`);
  return response.data;
};

// POST /api/PaymentMethod
export const createPaymentMethod = async (
  data: PaymentMethodCreateDto
): Promise<string> => {
  const response = await apiClient.post("/PaymentMethod", data);
  return response.data; // Returns GUID
};

// PUT /api/PaymentMethod/{id}
export const updatePaymentMethod = async (
  id: string,
  data: PaymentMethodUpdateDto
): Promise<void> => {
  await apiClient.put(`/PaymentMethod/${id}`, data);
};

// DELETE /api/PaymentMethod/{id}
export const deletePaymentMethod = async (id: string): Promise<void> => {
  await apiClient.delete(`/PaymentMethod/${id}`);
};
