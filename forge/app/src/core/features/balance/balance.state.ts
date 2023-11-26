import { atom } from 'recoil';

export enum Currency {
  rub = 'RUB',
  usd = 'USD',
}

export enum BalanceAtomKeys {
  balance = 'balance',
}

export interface Balance {
  value: number;
  currency: Currency;
}

export const balanceAtom = atom<Balance>({
  key: BalanceAtomKeys.balance,
  default: {
    value: 0,
    currency: Currency.rub,
  },
});
