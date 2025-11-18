import apiClient from "./apiClient";
import type {
  ImageDto,
  ImageCreateDto,
  ImageUpdateDto,
} from "../types/image.types";

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

// POST /api/Image
export const createImage = async (data: ImageCreateDto): Promise<string> => {
  const response = await apiClient.post("/Image", data);
  return response.data; // Returns GUID
};

// PUT /api/Image/{id}
export const updateImage = async (
  id: string,
  data: ImageUpdateDto
): Promise<void> => {
  await apiClient.put(`/Image/${id}`, data);
};

// DELETE /api/Image/{id}
export const deleteImage = async (id: string): Promise<void> => {
  await apiClient.delete(`/Image/${id}`);
};
