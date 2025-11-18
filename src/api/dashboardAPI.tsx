import apiClient from "./apiClient";
import type { AccomIncomeDto, AccomReviewDto } from "../types/dashboard.types";

// GET /api/dashboard/income
export const getIncomeData = async (params: {
  year?: number;
  from?: string;
  to?: string;
  granularity?: "Day" | "Month" | "Year";
}): Promise<AccomIncomeDto[]> => {
  const response = await apiClient.get("/dashboard/income", { params });
  return response.data;
};

export const getReviewData = async (params: {
  year?: number;
  from?: string;
  to?: string;
  granularity?: "Day" | "Month" | "Year";
}): Promise<AccomReviewDto[]> => {
  const response = await apiClient.get("/dashboard/reviews", { params });
  return response.data;
};

export const getUserCount = async (): Promise<{ userNumber: number }> => {
  const response = await apiClient.get("/Dashboard/users/count");
  return response.data;
};

export const getReviewCount = async (): Promise<{ reviewNumber: number }> => {
  const response = await apiClient.get("/Dashboard/reviews/count");
  return response.data;
};

export const getAccomCount = async (): Promise<{ accomNumber: number }> => {
  const response = await apiClient.get("/Dashboard/accommodations/count");
  return response.data;
};
