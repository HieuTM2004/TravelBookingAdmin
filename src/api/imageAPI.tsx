import apiClient from "./apiClient";
import type { ImageDto } from "../types/image.types";

// GET /api/Image - List all
export const getImages = async (): Promise<ImageDto[]> => {
  const response = await apiClient.get("/Image");
  return response.data;
};

// GET /api/Image/{id} - Detail
export const getImageById = async (id: string): Promise<ImageDto> => {
  const response = await apiClient.get(`/Image/${id}`);
  return response.data;
};

export const createImage = async (file: File, alt: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("alt", alt);
  const response = await apiClient.post("/Image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// PUT /api/Image/{id}
export const updateImage = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.put(`/Image/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// DELETE /api/Image/{id}
export const deleteImage = async (id: string): Promise<void> => {
  await apiClient.delete(`/Image/${id}`);
};
