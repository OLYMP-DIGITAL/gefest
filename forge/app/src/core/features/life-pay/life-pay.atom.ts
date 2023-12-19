import { atom } from 'recoil';

export const LIFE_PAY_API_KEY = '371e8d524a252852cd186df76dfe4a5b';
export const LIFE_PAY_SERVICE_ID = '89264';

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
