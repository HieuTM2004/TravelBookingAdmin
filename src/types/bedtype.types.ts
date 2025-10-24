// types/bedtype.types.ts
export interface BedTypeDto {
  id: string;
  type: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
}

export interface BedTypeCreateDto {
  type: string;
}

export interface BedTypeUpdateDto {
  type: string;
}