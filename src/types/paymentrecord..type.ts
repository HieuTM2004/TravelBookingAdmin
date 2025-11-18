export interface PaymentRecordDto {
  id: string;
  userId: string;
  roomId: string;
  roomName: string;
  price: number;
  paymentMethodId: string;
  paymentMethodName: string;
  status: number; 
}

export interface PaymentRecordCreateDto {
  roomId: string;
  paymentMethodId: string;
  status: number;
}

export interface PaymentRecordUpdateDto {
  roomId: string;
  paymentMethodId: string;
  status: number;
}