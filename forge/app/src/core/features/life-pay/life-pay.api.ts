/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import api from 'core/services/api';
import { LIFE_PAY_API_KEY, LIFE_PAY_SERVICE_ID } from './life-pay.atom';
import { LifePayTransaction } from './life-pay.types';
// import { LifePayTransaction } from 'core/modules/wallet/components/user-actions-table/user-actions-table';

export enum LifePayRoutes {
  auth = 'https://api-ecom.life-pay.ru/v1/auth',
  createInvoice = 'https://api-ecom.life-pay.ru/v1/invoices',
  makeTransaction = 'life-pay-transaction',
  makeCryptoTransaction = 'life-pay-transaction/crypto',
  userTransactions = 'life-pay-transaction/user',
}

//  ==================== AUTH ==================================================
export interface LifePayAuthPayload {
  service_id: string;
  api_key: string;
}

export interface LifePayAuthReponse {
  jwt: string;
  lp_public: string;
}

export const makeLifePayAuth = (): Promise<LifePayAuthReponse> => {
  return api.post<LifePayAuthReponse>(LifePayRoutes.auth, {
    api_key: LIFE_PAY_API_KEY,
    service_id: LIFE_PAY_SERVICE_ID,
  } as LifePayAuthPayload);
};

//  ==================== Invoice create ========================================
export enum LifePayInvoiceStatus {
  open = 'open', // счет открыт
  pending = 'pending', // началась оплата по ссылке, необходимо отобразить лоадер на форме
  success = 'success', // счет успешно оплачен
  blocked = 'blocked', // средства захолдированы, но еще не оплачены/возвращены (двухстадийная оплата)
  error = 'error', // счет нельзя оплатить (истек)
}

export interface LifePayCreateInvoceResponse {
  amount: number;
  currency_code: 'RUB';
  email: string;
  form_link: string;
  id: string;
  is_recurrent: boolean;
  name: string;
  order_id: string;
  phone: number;
  // "send_receipt_through": null,
  service_id: number;
  short_id: number;
  status: LifePayInvoiceStatus;
  url_error: string;
  url_success: string;
}

export interface LifePayCreateInvoicePayload {
  order_id: string;
  amount: number;
  currency_code: 'RUB';
  service_id: number;
  name: string;
}

export const createLifePayInvoice = (): Promise<LifePayAuthReponse> => {
  return api.post<LifePayAuthReponse>(LifePayRoutes.auth, {
    api_key: LIFE_PAY_API_KEY,
    service_id: LIFE_PAY_SERVICE_ID,
  } as LifePayAuthPayload);
};

// ============================== Transaction ==================================
export interface MakeTransactionPayload {
  count: number;
}
export interface MakeTransactionResponse {
  link: string;
  error?: {
    name: string;
    status: number;
    details: any;
    message: string;
  };
}

export const makeTransaction = (
  payload: MakeTransactionPayload,
  isCrypto: boolean
): Promise<MakeTransactionResponse> => {
  const route = isCrypto
    ? LifePayRoutes.makeCryptoTransaction
    : LifePayRoutes.makeTransaction;
  return api.post<MakeTransactionResponse>(route, payload);
};

export const getUserTransactions = (): Promise<LifePayTransaction[]> => {
  return api.get<LifePayTransaction[]>(LifePayRoutes.userTransactions);
};
