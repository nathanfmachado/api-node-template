export interface PaymentPartsInputModel {
  productId: string;
  parts: number;
}

export interface PaymentPartsResultModel {
  parts: number;
  totalAmount: number;
  partAmount: number;
}
