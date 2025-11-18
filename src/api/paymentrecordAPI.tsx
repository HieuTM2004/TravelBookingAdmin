// api/paymentrecordAPI.ts
import {
  PaymentRecordCreateDto,
  PaymentRecordDto,
  PaymentRecordUpdateDto,
} from "../types/paymentrecord..type";
import apiClient from "./apiClient";

// GET /api/PaymentRecord - List all
export const getPaymentRecords = async (): Promise<PaymentRecordDto[]> => {
  const response = await apiClient.get("/PaymentRecord");
  return response.data;
};

// GET /api/PaymentRecord/{id} - Detail
export const getPaymentRecordById = async (
  id: string
): Promise<PaymentRecordDto> => {
  const response = await apiClient.get(`/PaymentRecord/${id}`);
  return response.data;
};

// POST /api/PaymentRecord
export const createPaymentRecord = async (
  data: PaymentRecordCreateDto
): Promise<string> => {
  const response = await apiClient.post("/PaymentRecord", data);
  return response.data; // Returns GUID
};

// PUT /api/PaymentRecord/{id}
export const updatePaymentRecord = async (
  id: string,
  data: PaymentRecordUpdateDto
): Promise<void> => {
  await apiClient.put(`/PaymentRecord/${id}`, data);
};

// DELETE /api/PaymentRecord/{id}
export const deletePaymentRecord = async (id: string): Promise<void> => {
  await apiClient.delete(`/PaymentRecord/${id}`);
};
