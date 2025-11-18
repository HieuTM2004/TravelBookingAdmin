export interface ReviewDto {
  id: string;
  rating: number;
  review: string;
  createdAt: string;
  createdBy?: string | null;
  userId: string;
  userName: string;
  accomId: string;
}

export interface ReviewCreateDto {
  rating: number;
  review: string;
}

export interface ReviewUpdateDto {
  rating: number;
  review: string;
}