/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { atom } from 'recoil';
import { LifePayTransaction } from './life-pay.types';

export const LIFE_PAY_API_KEY = process.env.LIFE_PAY_API_KEY as string;
export const LIFE_PAY_SERVICE_ID = process.env.LIFE_PAY_SERVICE_ID as string;

export const LIFE_PAY_JWT_ATOM_KEY = 'LIFE_PAY_JWT_ATOM_KEY';
export const LIFE_PAY_PUBLIC = 'LIFE_PAY_LP_PUBLIC';
export const LIFE_PAY_TRANSACTIONS_ATOM_KEY = 'LIFE_PAY_TRANSACTIONS_ATOM_KEY';

export const lifePayJwtAtom = atom<string>({
  key: LIFE_PAY_JWT_ATOM_KEY,
  default: '',
});

export const lifePayPublicAtom = atom<string>({
  key: LIFE_PAY_PUBLIC,
  default: '',
});

export const lifePayTransactionsAtom = atom<LifePayTransaction[]>({
  key: LIFE_PAY_TRANSACTIONS_ATOM_KEY,
  default: [],
});
