import { atom } from 'recoil';
import { TokenAtomKey, User, UserAtomKey } from './users.types';

export const userAtom = atom<User | null>({
  key: UserAtomKey,
  default: null,
});

export const tokenAtom = atom<string>({
  key: TokenAtomKey,
  default: '',
});
