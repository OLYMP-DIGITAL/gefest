// *****************************************************************************
// =============================== INTERFACES ==================================
// *****************************************************************************
export interface LifePayAuthPayload {
  api_key: string;
  service_id: number;
}

export interface LifePayAuthResponse {
  jwt: string;
  lp_public: string;
}

export enum LifePayInvoiceStatus {
  open = 'open', // счет открыт
  pending = 'pending', // началась оплата по ссылке, необходимо отобразить лоадер на форме
  success = 'success', // счет успешно оплачен
  blocked = 'blocked', // средства захолдированы, но еще не оплачены/возвращены (двухстадийная оплата)
  error = 'error', // счет нельзя оплатить (истек)
}

export enum LifePayCurrency {
  rub = 'RUB',
}

export interface LifePayGetTransactionResponse {
  amount: string;
  charge: {
    id: string;
    payment_token_id: string;
    status: string;
  };
  currency_code: LifePayCurrency;
  email: string;
  id: string;
  is_recurrent: boolean;
  name: string;
  order_id: string;
  phone: string;
  recurrent_url: null;
  send_receipt_through: null;
  short_id: number;
  status: LifePayInvoiceStatus;
}

export interface LifePayTransaction {
  user: any;
  shareValue: number;
  shareCount: number;
  dollarRate: number;
  orderId: string;
  transactionId: string;
  transactionLink: string;
}
