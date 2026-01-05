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

export interface ReviewPoint {
  period: string;
  count: number;
}

export interface AccomReviewAnalytics {
  accomId: string;
  accomName: string;
  points: ReviewPoint[];
  total: number;
}

export interface ReviewQueryParams {
  year?: number;
  month?: number;
  from?: string;
  to?: string;
  granularity?: number; // 0, 1, 2
}

// api/dashboardAPI.ts
export const getReviewAnalytics = async (params: ReviewQueryParams) => {
  const response = await apiClient.get("/Dashboard/reviews", { params });
  return response.data;
};

export interface ReviewQueryParams {
  year?: number;
  month?: number;
  from?: string;
  to?: string;
  granularity?: number; // 0: Daily, 1: Monthly, 2: Yearly
}

export interface IncomePoint {
  period: string;
  amount: number; // Tiền ở đây
}

export interface AccomIncomeAnalytics {
  accomId: string;
  accomName: string;
  points: IncomePoint[];
  total: number;
}

export const getIncomeAnalytics = async (params: ReviewQueryParams) => {
  const response = await apiClient.get("/Dashboard/income", { params });
  return response.data;
};
