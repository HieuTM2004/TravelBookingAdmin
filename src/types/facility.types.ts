// types/facility.types.ts - New file for Facility types
export interface FacilityDto {
  id: string;
  name: string;
  icon: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
}

export interface FacilityCreateDto {
  name: string;
  icon: string;
}

export interface FacilityUpdateDto {
  name: string;
  icon: string;
}