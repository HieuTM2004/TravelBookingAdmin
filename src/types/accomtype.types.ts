export interface AccomTypeDto {
  id: string;
  type: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
}

export interface AccomTypeCreateDto {
  type: string;
}

export interface AccomTypeUpdateDto {
  type: string;
}