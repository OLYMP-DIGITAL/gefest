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

export interface MakeTransactionPayload {
  value: number;
}

export interface CreatedPayload {
  id: string;
  status: TransactionStatus;

  created_at: string;

  test: true;
  paid: boolean;
  refundable: boolean;

  metadata: {};

  amount: {
    value: string;
    currency: Currency;
  };

  recipient: {
    account_id: string;
    gateway_id: string;
  };

  payment_method: {
    type: 'bank_card';
    id: string;
    saved: boolean;
  };

  confirmation: {
    type: 'redirect';
    return_url: string;
    confirmation_url: string;
  };
}
