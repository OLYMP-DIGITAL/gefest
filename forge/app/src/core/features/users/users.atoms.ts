/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
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
