import { atom } from 'recoil';

export const LIFE_PAY_API_KEY = process.env.LIFE_PAY_API_KEY as string;
export const LIFE_PAY_SERVICE_ID = process.env.LIFE_PAY_SERVICE_ID as string;

export const LIFE_PAY_JWT_ATOM_KEY = 'LIFE_PAY_JWT_ATOM_KEY';
export const LIFE_PAY_PUBLIC = 'LIFE_PAY_LP_PUBLIC';

export const lifePayJwtAtom = atom<string>({
  key: LIFE_PAY_JWT_ATOM_KEY,
  default: '',
});

export const lifePayPublicAtom = atom<string>({
  key: LIFE_PAY_PUBLIC,
  default: '',
});
