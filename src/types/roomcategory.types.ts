import { Facility, Room, Image } from "./accommodation.types";

// types/roomcategory.types.ts 
export interface RoomCategoryDto {
    id: string;
  name: string;
  basicFacilities: string[];
  roomFacilities: string[];
  bathAmenities: string[];
  about: string;
  accomId: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
  images: Image[];  // From previous types
  facilities: Facility[];  // From previous types
  rooms: Room[];
}

export interface RoomCategoryCreateDto {
  name: string;
  basicFacilities: string[];
  roomFacilities: string[];
  bathAmenities: string[];
  about: string;
  accomId: string;
}

export interface RoomCategoryUpdateDto {
  name: string;
  basicFacilities: string[];
  roomFacilities: string[];
  bathAmenities: string[];
  about: string;
  accomId: string;
}