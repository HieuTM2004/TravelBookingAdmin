export interface CancelPolicyDto {
  id: string;
  type: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
}

export interface CancelPolicyCreateDto {
  type: string;
}

export interface CancelPolicyUpdateDto {
  type: string;
}