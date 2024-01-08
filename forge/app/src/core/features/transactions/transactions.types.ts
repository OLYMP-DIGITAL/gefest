export enum TransactionStatus {
  'waiting_for_capture' = 'waiting_for_capture',
  'pending' = 'pending',
  'succeeded' = 'succeeded',
  'canceled' = 'canceled',
}

export enum Currency {
  rub = 'RUB',
  usd = 'USD',
}

export interface Transaction {
  value: number;
  currency: Currency;
  payment: string;
  confirmation_url: string;
  status: keyof typeof TransactionStatus;
  user: any;
}

export interface MakeTransactionResponse {
  id: number;
}
