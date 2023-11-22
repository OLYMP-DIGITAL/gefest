import { atom } from 'recoil';
import { User, UserAtomKey } from './users.types';

export const userAtom = atom<User | null>({
  key: UserAtomKey,
  default: null,
});
