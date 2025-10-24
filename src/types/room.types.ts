// types/room.types.ts - Updated for exact API response
export interface RoomSummary {
  id: string;
  name: string;
  available: boolean;
  breakfast: boolean;
  rating: number;
  price: number;
  categoryId: string;
  categoryName: string;
  bedTypeId: string;
  bedTypeName?: string | null;
}

export interface RoomDetail extends RoomSummary {
  numberOfBeds: number;
  cancelPolicyId: string;
  cancelPolicyName: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
}

export interface RoomCreateDto {
  name: string;
  breakfast: boolean;
  numberOfBeds: number;
  bedTypeId: string;
  cancelPolicyId: string;
  categoryId: string;
  available: boolean;
  rating: number;
}

export interface RoomUpdateDto {
  name: string;
  breakfast: boolean;
  numberOfBeds: number;
  bedTypeId: string;
  cancelPolicyId: string;
  categoryId: string;
  available: boolean;
  rating: number;
}