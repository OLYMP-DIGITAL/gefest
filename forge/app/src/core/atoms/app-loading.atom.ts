/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { atom } from 'recoil';

export const APP_LOADING_ATOM_KEY = 'APP_LOADING_ATOM_KEY';

export const appLoadingAtom = atom<boolean>({
  key: APP_LOADING_ATOM_KEY,
  default: false,
});
