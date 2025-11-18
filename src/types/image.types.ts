// types/image.types.ts - New file for Image types
export interface ImageDto {
  id: string;
  url: string;
  alt: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
}

export interface ImageCreateDto {
  url: string;
  alt: string;
}

export interface ImageUpdateDto {
  url: string;
  alt: string;
}