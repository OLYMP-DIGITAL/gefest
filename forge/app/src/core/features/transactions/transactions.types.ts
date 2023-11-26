export enum TransactionStatus {
  pending = 'pending',
}

export enum Currency {
  rub = 'RUB',
  usd = 'USD',
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
