// api/roomAPI.ts
import apiClient from "./apiClient";
import type {
  RoomSummary,
  RoomDetail,
  RoomCreateDto,
  RoomUpdateDto,
} from "../types/room.types";

// GET /api/Room/Categories/{categoryId}
export const getRoomsByCategoryId = async (
  categoryId: string
): Promise<RoomSummary[]> => {
  const response = await apiClient.get(`/Room/Categories/${categoryId}`);
  return response.data;
};

// GET /api/Room/{id}
export const getRoomById = async (id: string): Promise<RoomDetail> => {
  const response = await apiClient.get(`/Room/${id}`);
  return response.data;
};

// POST /api/Room
export const createRoom = async (data: RoomCreateDto): Promise<string> => {
  const response = await apiClient.post("/Room", data);
  return response.data; // Returns GUID
};

// POST /api/Room/bulk
export const createBulkRooms = async (
  data: RoomCreateDto[]
): Promise<RoomCreateDto[]> => {
  const response = await apiClient.post("/Room/bulk", data);
  return response.data;
};

// PUT /api/Room/{id}
export const updateRoom = async (
  id: string,
  data: RoomUpdateDto
): Promise<void> => {
  await apiClient.put(`/Room/${id}`, data);
};

// DELETE /api/Room/{id}
export const deleteRoom = async (id: string): Promise<void> => {
  await apiClient.delete(`/Room/${id}`);
};
